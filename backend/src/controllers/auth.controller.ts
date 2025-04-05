import { UtilPlugin } from "#back/plugins";
import { CreateUserDto } from "#back/repository/dto";
import { AuthService } from "#back/services";
import { UserService } from "#back/services";
import Elysia, { t } from "elysia";

const AuthController = new Elysia({
  name: "auth.controller",
  prefix: "/auth",
  tags: ["Auth"],
})

  .use(AuthService)
  .use(UserService)
  .use(UtilPlugin)

  .post(
    "/login",
    async ({
      utilPlugin: { passwordCompare },
      userService: { getUserByNameOrEmailOrId },
      authService: { createToken },
      body: { email, password },
      error,
    }) => {
      const user = await getUserByNameOrEmailOrId(email);
      if (!user) return error("Not Found", "No User Found");
      const result = await passwordCompare(password, user.password);
      if (!result) return error("Not Found", "No User Found");
      const token = await createToken(user.id);
      return token;
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
      response: {
        200: t.Object({
          refreshToken: t.String(),
          accessToken: t.String(),
        }),

        404: t.String(),
      },
    },
  )

  .post(
    "/register",
    async ({ error, authService, userService, body }) => {
      const data = await userService.createUser(body);
      if (!data?.id) return error("Conflict", { error: "Already exist" });
      const token = await authService.createToken(data.id);
      return token;
    },
    {
      body: CreateUserDto,
      response: {
        200: t.Object({
          refreshToken: t.String(),
          accessToken: t.String(),
        }),

        409: t.Object({
          error: t.String(),
        }),
      },
    },
  )

  .post(
    "/logout",
    async ({ authService: { blacklistRefresh }, body: { refreshToken } }) => {
      const success = await blacklistRefresh(refreshToken);
      return { success };
    },
    {
      body: t.Object({
        refreshToken: t.String(),
      }),
      response: t.Object({
        success: t.Boolean(),
      }),
    },
  )

  .get(
    "/refresh",
    async ({
      authService: { getRefreshInfo, createAcessToken },
      query: { token },
      error,
    }) => {
      const userId = await getRefreshInfo(token);
      if (userId) return await createAcessToken(userId);
      return error(400, "Invalid Token");
    },
    {
      query: t.Object({ token: t.String() }),
      response: {
        200: t.String(),
        400: t.String(),
      },
    },
  );
export { AuthController };
