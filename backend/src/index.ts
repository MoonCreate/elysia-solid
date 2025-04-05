import Elysia from "elysia";
import { APP_PORT } from "./constants/env";
import { Controllers } from "./controllers";
import { CorsPlugin, LoggerPlugin, SwaggerPlugin } from "./plugins";

const app = new Elysia({
  name: "backend.elysia.app",
  prefix: "/api",
})
  .use(CorsPlugin)
  .use(SwaggerPlugin)
  .use(LoggerPlugin)
  .use(Controllers)
  .onStart(({ server }) => {
    console.log(`🦊 Backend Server Running on: ${server?.url}`);
  })
  .listen(APP_PORT);

type App = typeof app;

export { app, type App };
