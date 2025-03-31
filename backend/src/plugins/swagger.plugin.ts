import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

const SwaggerPlugin = new Elysia({ name: "swager.plugin" }).use(
  await swagger({
    path: "/docs",
    documentation: {
      info: {
        title: "Backend Documentation",
        version: "0.0.1",
      },
      components: {
        securitySchemes: {
          "auth.token": {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  }),
);

export { SwaggerPlugin };
