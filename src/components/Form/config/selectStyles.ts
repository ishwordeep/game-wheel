import { ChakraStylesConfig } from "chakra-react-select";

export const selectStyles: ChakraStylesConfig = {
  dropdownIndicator: (prev, { selectProps }) => ({
    ...prev,
    "> svg": {
      transition: "transform 0.3s",
      transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
    },
    color: "gray.500",
  }),
  menuList: (prev) => ({
    ...prev,
    zIndex: 99,
    scrollbarWidth: "thin",
    scrollBehavior: "smooth",
  }),
  menu: (prev) => ({
    ...prev,
    zIndex: 99,
  }),

  option: (prev) => ({
    ...prev,
    zIndex: 99,
    fontSize: { base: "14px", md: "16px" },
  }),
  control: (prev) => ({
    ...prev,
    borderColor: "gray.300",
    borderRadius: 5,
    shadow: "sm",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    bg: "white",
    cursor: "pointer",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    color: "gray.200",
    "&:hover": {
      color: "gray.200",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "gray.200",
    "&:hover": {
      color: "gray.200",
    },
  }),
};
