import { Image, ImageProps, Skeleton, SkeletonProps } from "@chakra-ui/react";
import { FC, useState } from "react";

interface LazyImageProps {
  id?: string;
  [x: string]: any;
}

const LazyImage: FC<LazyImageProps & ImageProps & SkeletonProps> = ({
  id,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Skeleton isLoaded={isLoaded} aspectRatio={16 / 9}>
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
