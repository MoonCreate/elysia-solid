import Elysia from "elysia";
import { APP_PORT } from "./constants/env";
import { Controllers } from "./controllers";
import { SwaggerPlugin } from "./plugins";

const app = new Elysia({
  name: "backend.elysia.app",
})
  .use(SwaggerPlugin)
  .use(Controllers)
  .onStart(({ server }) => {
    console.log(`🦊 Backend Server Running on: ${server?.url}`);
  })
  .listen(APP_PORT);

type App = typeof app;

export { app, type App };
