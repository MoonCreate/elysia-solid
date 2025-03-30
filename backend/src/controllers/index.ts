import Elysia from "elysia";
import { HomeController } from "./home.controller";
import { ResponseStandarPlugin } from "#back/plugins/response-standar.plugin";

const Controllers = new Elysia({ name: "controllers" })
  .use(ResponseStandarPlugin)
  .use(HomeController)

export { Controllers };
