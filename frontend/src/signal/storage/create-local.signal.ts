import { createEffect, createRoot, createSignal } from "solid-js";

const createLocalStorageSignal = <Value>(props: {
  key: string;
  type: Value extends string ? "string" : "json";
  outsideComponent?: boolean;
}) => {
  const rawValue = localStorage.getItem(props.key) ?? undefined;
  const defaultValue: Value | undefined =
    rawValue !== undefined
      ? props.type === "json"
        ? JSON.parse(rawValue)
        : rawValue
      : undefined;

  const [getValue, setValue] = createSignal(defaultValue);

  const effect = () => {
    const value = getValue();
    if (value === undefined) localStorage.removeItem(props.key);
    else
      localStorage.setItem(
        props.key,
        props.type === "string" && typeof value === "string"
          ? value
          : JSON.stringify(value),
      );
  };

  props.outsideComponent
    ? createRoot(() => createEffect(effect))
    : createEffect(effect);

  return [getValue, setValue];
};

export { createLocalStorageSignal };
