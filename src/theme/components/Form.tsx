const activeLabelStyles = {
  transform: "scale(0.9) translateY(-25px)",
  transition: "transform 0.2s ease-in-out",
  px: 2,
};

const label = {
  top: 1.5,
  zIndex: 2,
  position: "absolute",
  pointerEvents: "none",
  mx: 3,
  px: 2,
  my: 1,
  transformOrigin: "left top",
};

export const Form = {
  variants: {
    floating: {
      container: {
        position: "relative",
        "&[data-has-value=true]": {
          label: {
            ...activeLabelStyles,
          },
        },
        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
          {
            ...activeLabelStyles,
          },
        label,
      },
    },
  },
};
