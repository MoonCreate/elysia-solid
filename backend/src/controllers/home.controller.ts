import { HomeService } from "#back/services";
import Elysia, { t } from "elysia";

const HomeController = new Elysia({
  name: "home.controller", detail: {
    tags: ["Home"],
    summary: "Greet user",
  }
})
  .use(HomeService)
  .get("/", ctx => ctx.homeService.greet(ctx.query.name ?? "there"), {
    query: t.Object({
      name: t.Optional(t.String())
    }),
    response: t.String(),
  });

export { HomeController };
