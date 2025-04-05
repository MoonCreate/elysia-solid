import { JwtPlugin } from "#back/plugins";
import { Repository } from "#back/repository";
import { eq } from "drizzle-orm";
import Elysia from "elysia";

const TokenType = {
  "token.access": 0,
  "token.refresh": 1,
} as const;

const AuthService = new Elysia({ name: "auth.service" })
  .use(Repository)
  .use(JwtPlugin)

  .derive(
    { as: "scoped" },
    ({
      db,
      schema: { SessionTable },
      headers: { authorization },
      accessJwt,
      refreshJwt,
    }) => ({
      authService: {
        async hasAccess() {
          if (!authorization) return false;
          const token = authorization.replace("Bearer ", "");
          const user = await accessJwt.verify(token);

          return !!user && user.typ === TokenType["token.access"];
        },

        createAcessToken: async (userId: string, now = Date.now()) => {
          return accessJwt.sign({
            sub: userId,
            typ: TokenType["token.access"],
            iat: now,
          });
        },

        createToken: async (userId: string) => {
          const now = Date.now();
          const [accessToken, refreshToken] = await Promise.all([
            accessJwt.sign({
              sub: userId,
              typ: TokenType["token.access"],
              iat: now,
            }),

            refreshJwt.sign({
              sub: userId,
              typ: TokenType["token.refresh"],
              iat: now,
              exp: 30 * 24 * 60 * 60 * 1_000, // 30 days
            }),
          ]);

          await db.insert(SessionTable).values({
            userId,
            token: refreshToken,
          });

          return { accessToken, refreshToken };
        },

        async blacklistRefresh(token: string) {
          const result = await refreshJwt.verify(token);
          if (
            !result ||
            result.typ !== TokenType["token.refresh"] ||
            !result.sub
          )
            return false;
          const { rowCount } = await db
            .delete(SessionTable)
            .where(eq(SessionTable.token, token));
          return rowCount === 1;
        },

        async getRefreshInfo(token: string) {
          const sessionData = await db.query.SessionTable.findFirst({
            where: (session, { eq }) => eq(session.token, token),
          });
          if (!sessionData) return undefined;

          const result = await refreshJwt.verify(token);
          if (!result) {
            await db.delete(SessionTable).where(eq(SessionTable.token, token));
            return undefined;
          }
          return sessionData.userId;
        },
      },
    }),
  )

  .macro({
    mustSignIn: {
      beforeHandle: async ({ authService, error }) => {
        const isHasAccess = await authService?.hasAccess();
        if (!isHasAccess) return error("Unauthorized");
      },
    },
    mustSignOut: {
      beforeHandle: async ({ authService, error }) => {
        const isHasAccess = await authService?.hasAccess();
        if (isHasAccess) return error("Not Found");
      },
    },
  });

export { AuthService };
