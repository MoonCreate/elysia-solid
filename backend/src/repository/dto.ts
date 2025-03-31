import { t } from "elysia";
import { createInsertSchema } from "drizzle-typebox";
import { UserTable } from "./schema";

const BaseCreateUserDto = createInsertSchema(UserTable, {
  email: t.String({ format: "email" }),
});

const CreateUserDto = t.Pick(BaseCreateUserDto, [
  "email",
  "password",
  "firstName",
  "lastName",
]);

export { CreateUserDto };
