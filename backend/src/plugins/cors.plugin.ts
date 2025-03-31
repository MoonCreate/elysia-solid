import cors from "@elysiajs/cors";
import Elysia from "elysia";

const CorsPlugin = new Elysia({ name: "cors.plugin" }).use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
  }),
);

export { CorsPlugin };
