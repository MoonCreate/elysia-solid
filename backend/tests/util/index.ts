import { App } from "#back/index";
import { treaty } from "@elysiajs/eden";

const api = treaty<App>("localhost:8000");

export { api };
