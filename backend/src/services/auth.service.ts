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
    ({ db, schema: { SessionTable }, headers: { authorization }, jwt }) => ({
      authService: {
        async hasAccess() {
          if (!authorization) return false;
          const token = authorization.replace("Bearer ", "");
          const user = await jwt.verify(token);

          return !!user && user.typ === TokenType["token.access"];
        },

        createToken: async (userId: string) => {
          const now = Date.now();
          const [accessToken, refreshToken] = await Promise.all([
            jwt.sign({
              sub: userId,
              typ: TokenType["token.access"],
              iat: now,
              exp: 30 * 1_000, // 30sec
            }),

            jwt.sign({
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
          const result = await jwt.verify(token);
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
