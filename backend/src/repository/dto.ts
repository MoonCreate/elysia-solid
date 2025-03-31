import { t } from "elysia";

const CreateUserDto = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
  firstName: t.String({ maxLength: 50 }),
  lastName: t.String({ maxLength: 50 }),
});

export { CreateUserDto };
