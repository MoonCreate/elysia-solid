import { createEffect, createRoot, createSignal } from "solid-js";
import jsCookie from "js-cookie";

const createCookieSignal = <Value>(properties: {
  key: string;
  type: Value extends string ? "string" : "json";
  outsideComponent?: boolean;
}) => {
  const rawValue = jsCookie.get(properties.key) ?? undefined;
  const defaultValue: Value | undefined =
    rawValue === undefined
      ? undefined
      : properties.type === "json"
        ? JSON.parse(rawValue)
        : rawValue;

  const [getValue, setValue] = createSignal(defaultValue);

  const effect = () => {
    const value = getValue();
    if (value === undefined) jsCookie.remove(properties.key);
    else
      jsCookie.set(
        properties.key,
        properties.type === "string" && typeof value === "string"
          ? value
          : JSON.stringify(value),
      );
  };

  if (properties.outsideComponent) {
    createRoot(() => createEffect(effect));
  } else {
    createEffect(effect);
  }

  return [getValue, setValue];
};

export { createCookieSignal };
