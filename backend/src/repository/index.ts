import { DATABASE_URL } from "#back/constants/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import Elysia from "elysia";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle({ client: pool, schema });


const Repository = new Elysia({ name: "repository" })
  .decorate("db", db)
  .decorate("schema", schema);

export { db, Repository };
