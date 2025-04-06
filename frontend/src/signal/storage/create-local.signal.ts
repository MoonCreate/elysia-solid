import { createEffect, createRoot, createSignal } from "solid-js";

const createLocalStorageSignal = <Value>(properties: {
  key: string;
  type: Value extends string ? "string" : "json";
  outsideComponent?: boolean;
}) => {
  const rawValue = localStorage.getItem(properties.key) ?? undefined;
  const defaultValue: Value | undefined =
    rawValue === undefined
      ? undefined
      : properties.type === "json"
        ? JSON.parse(rawValue)
        : rawValue;

  const [getValue, setValue] = createSignal(defaultValue);

  const effect = () => {
    const value = getValue();
    if (value === undefined) localStorage.removeItem(properties.key);
    else
      localStorage.setItem(
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

export { createLocalStorageSignal };
