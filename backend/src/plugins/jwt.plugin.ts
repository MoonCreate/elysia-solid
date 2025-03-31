import { JWT_SECRET } from "#back/constants/env";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const JwtPlugin = new Elysia({ name: "jwt.plugin" }).use(
  jwt({
    name: "jwt",
    secret: JWT_SECRET,
  }),
);
