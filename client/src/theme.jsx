import { extendTheme } from "@chakra-ui/react";
const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      code: {
        fontFamily: "sorce-code-pro, Menlo, Consolas,'Courier New', monospace",
      },
    },
  },
};

export default extendTheme(theme);
