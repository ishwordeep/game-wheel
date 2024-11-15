import { extendTheme } from "@chakra-ui/react";
import { ColorStyle as colors } from "./ColorStyle";
import { Button } from "./components/Button";
import { Form } from "./components/Form";

export const theme = extendTheme({
  styles: {
    global: () => ({
      "&::-webkit-scrollbar": {
        scrollbarBehavior: "smooth",
        width: "6px",
        height: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        bg: "primary.500",
        borderRadius: "full",
      },
      "html, body": {
        fontFamily: "Po",
        bg: "gray.100",
      },
    }),
  },
  colors,
  components: {
    Button,
    Form,
  },
});
