import { api } from "#front/api";
import { createQuery, keepPreviousData } from "@tanstack/solid-query";

const createGreetIndexApi = (name: () => string) => {
  return createQuery(() => ({
    placeholderData: keepPreviousData,
    queryKey: ["greet.index.api", name()],
    queryFn: async () => {
      return api.index.get({ query: { name: name() } }).then((x) => x.data);
    },
  }));
};

api.protected;

export { createGreetIndexApi };
