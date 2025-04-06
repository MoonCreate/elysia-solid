import { JSX } from "solid-js";
import { Toaster } from "#front/components/ui/toast";
import { ThemeProvider } from "./theme.context";

type Properties = {
  children: JSX.Element;
};

function ContexProvider(properties: Properties) {
  return (
    <ThemeProvider>
      <Toaster />
      {properties.children}
    </ThemeProvider>
  );
}

export { ContexProvider };
