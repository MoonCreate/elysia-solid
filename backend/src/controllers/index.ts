import Elysia from "elysia";
import { HomeController } from "./home.controller";
import { ResponseStandarPlugin } from "#back/plugins";
import { AuthController } from "./auth.controller";

const Controllers = new Elysia({ name: "controllers" })
  .use(ResponseStandarPlugin)
  .use(HomeController)
  .use(AuthController);

export { Controllers };
