import { AuthService, HomeService } from "#back/services";
import Elysia, { t } from "elysia";

const HomeController = new Elysia({
  name: "home.controller",
  detail: {
    tags: ["Home"],
  },
})
  .use(HomeService)
  .use(AuthService)

  .get("/", (ctx) => ctx.homeService.greet(ctx.query.name ?? "there"), {
    query: t.Object({
      name: t.Optional(t.String()),
    }),
    response: t.String(),
    mustSignIn: true,
  })
  .get("/protected", () => "Hello", {
    mustSignIn: true,
  });

export { HomeController };
