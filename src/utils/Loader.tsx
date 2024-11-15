import { Center, ResponsiveValue, Spinner } from "@chakra-ui/react";
import { FC } from "react";

interface LoaderProps {
  height?: ResponsiveValue<string | number>;
  width?: ResponsiveValue<string | number>;
}

const Loader: FC<LoaderProps> = ({ height, width }) => {
  return (
    <Center h={height ?? "100dvh"} w={width ?? "100dvw"}>
      <Spinner
        thickness="4px"
        emptyColor="transparent"
        speed="0.65s"
        size={"xl"}
        color={"primary.500"}
      />
    </Center>
  );
};

export default Loader;
