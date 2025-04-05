import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const APP_PORT = Value.Parse(Type.Number(), process.env.APP_PORT);
const DATABASE_URL = Value.Parse(Type.String(), process.env.DATABASE_URL);
const JWT_SECRET = Value.Parse(Type.String(), process.env.JWT_SECRET);

export { APP_PORT, DATABASE_URL, JWT_SECRET };
