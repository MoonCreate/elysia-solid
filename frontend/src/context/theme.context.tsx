import {
  ColorModeProvider,
  ColorModeScript,
  cookieStorageManager,
} from "@kobalte/core";
import { JSX } from "solid-js";

type Props = {
  children: JSX.Element;
};

function ThemeProvider(props: Props) {
  return (
    <>
      <ColorModeScript storageType={cookieStorageManager.type} />
      <ColorModeProvider storageManager={cookieStorageManager}>
        {props.children}
      </ColorModeProvider>
    </>
  );
}

export { ThemeProvider };
