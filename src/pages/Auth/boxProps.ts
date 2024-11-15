import { useColorModeValue } from "@chakra-ui/react";

export const useCenterProps = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  return {
    bg,
    w: "100vw",
    h: "100dvh",
    px: 2,
  };
};

export const useBoxProps = () => {
  const bg = useColorModeValue("gray.100", "gray.900");

  return {
    bg: bg,
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: 5,
    gap: 6,
    p: 8,
  };
};
