import Elysia from "elysia";

const HomeService = new Elysia({ name: "home.service" })
  .derive({ as: "scoped" }, () => (
    {
      homeService: {
        greet: (name: string) => `Hello ${name}!`,
      }
    }
  ));

export { HomeService };
