import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

const SwaggerPlugin = new Elysia({ name: "swager.plugin" })
  .use(swagger({
    path: "/swagger",
    documentation: {
      info: {
        title: "Backend Documentation",
        version: await Bun.file("../../package.json", { type: "json" }).json().then(x => x.version),
      },
    }
  }));

export { SwaggerPlugin };
