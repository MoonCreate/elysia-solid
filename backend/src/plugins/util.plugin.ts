import Elysia from "elysia";

const UtilPlugin = new Elysia({ name: "util.plugin" }).decorate("utilPlugin", {
  passwordHash: (str: string) =>
    Bun.password.hash(str, {
      algorithm: "bcrypt",
      cost: 10,
    }),
  passwordCompare: (str: string, hash: string) =>
    Bun.password.verify(str, hash),
});

export { UtilPlugin };
