import { Image, ImageProps, Skeleton } from "@chakra-ui/react";
import { FC, useState } from "react";

interface LazyImageProps {
  id?: string;
  startColor?: string;
  endColor?: string;
  [x: string]: any;
}

const LazyImage: FC<LazyImageProps & ImageProps> = ({
  alt = "",
  id,
  startColor = "gray.300",
  endColor = "gray.500",
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Skeleton
      startColor={startColor}
      endColor={endColor}
      isLoaded={isLoaded}
      fadeDuration={1}
    >
      <Image
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        boxShadow={"md"}
        {...rest}
      />
    </Skeleton>
  );
};

export default LazyImage;
