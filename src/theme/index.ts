import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ColorStyle } from "./ColorStyle";
import { Button } from "./components/Button";
import { Form } from "./components/Form";
import { textStyles } from "./components/TextStyle";

export const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const globalStyles = () => {
  return {
    "html, body": {
      fontFamily: "Poppins",
    },
  };
};

export const theme = extendTheme({
  config,
  styles: {
    global: globalStyles,
  },
  colors: ColorStyle,
  textStyles: textStyles,
  components: {
    Button,
    Form,
  },
});
