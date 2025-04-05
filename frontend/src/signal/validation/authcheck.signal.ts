import { createSignal } from "solid-js";

const [getMustLogin, setMustLogin] = createSignal(false);

export { getMustLogin, setMustLogin };
