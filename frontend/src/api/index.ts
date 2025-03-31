import { treaty } from "@elysiajs/eden";
import { type App } from "#back/index";
import { API_URL } from "#front/constanst";

// @ts-expect-error
const api = treaty<App>(API_URL);

export { api };
