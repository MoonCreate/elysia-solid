import { UtilPlugin } from "#back/plugins";
import { Repository } from "#back/repository";
import type { CreateUserDto } from "#back/repository/dto";
import Elysia from "elysia";

const UserService = new Elysia({ name: "user.service" })
  .use(UtilPlugin)
  .use(Repository)
  .derive({ as: "scoped" }, ({ db, schema, utilPlugin }) => ({
    userService: {
      getUserByNameOrEmailOrId: async (name: string) => {
        const query = db.query.UserTable.findFirst({
          columns: {
            id: true,
            password: true,
          },
          where: (user, { or, eq, sql }) =>
            or(
              eq(sql`concat(${user.firstName},' ',${user.lastName})`, name),
              eq(user.email, name),
              eq(user.id, name),
            ),
        });
        return await query;
      },

      createUser: async (data: typeof CreateUserDto.static) => {
        data.password = await utilPlugin.passwordHash(data.password);
        return (
          await db.insert(schema.UserTable).values(data).returning({
            id: schema.UserTable.id,
          })
        )[0];
      },
    },
  }));

export { UserService };
