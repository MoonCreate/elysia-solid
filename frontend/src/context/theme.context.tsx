import {
  ColorModeProvider,
  ColorModeScript,
  cookieStorageManager,
} from "@kobalte/core";
import { JSX } from "solid-js";

type Properties = {
  children: JSX.Element;
};

function ThemeProvider(properties: Properties) {
  return (
    <>
      <ColorModeScript storageType={cookieStorageManager.type} />
      <ColorModeProvider storageManager={cookieStorageManager}>
        {properties.children}
      </ColorModeProvider>
    </>
  );
}

export { ThemeProvider };
