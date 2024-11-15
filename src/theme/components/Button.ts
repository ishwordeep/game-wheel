import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  borderRadius: 5,
  fontWeight: 500,
  _active: {
    transform: "scale(0.99)",
  },
  width: "fit-content",
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
});

const outline = defineStyle((props) => ({
  borderRadius: 5,
  fontWeight: 500,
  border: "2px solid",
  borderColor: `${props.colorScheme}.500`,
  width: "fit-content",

  _active: {
    transform: "scale(0.99)",
  },
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  shadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
}));

export const buttonTheme = defineStyleConfig({
  variants: {
    solid,
    outline,
  },
});

const white = defineStyle({
  bg: "white",
  color: "gray.800",
  borderRadius: 5,
  fontWeight: 500,
  _hover: {
    bg: "gray.100",
    _loading: {
      bg: "white",
    },
    _disabled: {
      bg: "white",
    },
  },
  _active: {
    transform: "scale(0.99)",
  },

  width: "fit-content",
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.2)",
});

export const Button = defineStyleConfig({
  variants: {
    solid,
    outline,
    white,
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "primary",
  },
});
