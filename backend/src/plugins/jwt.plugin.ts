import { JWT_SECRET } from "#back/constants/env";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const JwtPlugin = new Elysia({ name: "jwt.plugin" })
  .use(
    jwt({
      name: "accessJwt",
      secret: JWT_SECRET,
      exp: "30s",
    }),
  )
  .use(
    jwt({
      name: "refreshJwt",
      secret: JWT_SECRET,
      exp: "1d",
    }),
  );
