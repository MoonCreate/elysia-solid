import { JSX } from "solid-js";
import { ThemeProvider } from "./theme.context";
import { Toaster } from "#front/components/ui/toast";

type Props = {
  children: JSX.Element;
};

function ContexProvider(props: Props) {
  return (
    <ThemeProvider>
      <Toaster />
      {props.children}
    </ThemeProvider>
  );
}

export { ContexProvider };
