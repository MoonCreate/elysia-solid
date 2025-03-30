import { Type, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const APP_PORT = Value.Parse(Type.Number(), process.env.APP_PORT);
const DATABASE_URL = Value.Parse(Type.String(), process.env.DATABASE_URL);

export { APP_PORT, DATABASE_URL };
