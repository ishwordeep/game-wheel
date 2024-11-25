const buttonStyle = {
  width: "max-content",
  transition: "transform 0.15s ease-out, background 0.15s ease-out",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  _hover: {
    boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.1)",
  },
  _active: {
    transform: "scale(0.95)",
  },
  fontWeight: 500,
};

export const Button = {
  variants: {
    primary: {
      ...buttonStyle,
      bg: "linear-gradient(90deg, #96760C 0%, #96760C 100%)",
      borderRadius: "50px",
      _hover: {
        bg: "linear-gradient(90deg, #B0881A 0%, #B89238  100%)",
      },
      border: "1px solid #FFF",
      color: "white",
      fontFamily: "Poppins",
    },
  },
};
