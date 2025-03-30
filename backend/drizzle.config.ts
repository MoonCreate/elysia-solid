import { DATABASE_URL } from "#back/constants/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/repository/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL
  }
});
