// MultipleFilePreviews.tsx

import {
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Image,
  PositionProps,
  ResponsiveValue,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface IPrevFiles {
  id: number;
  url: string;
}

interface FilePreview {
  url: string;
  fileName: string;
}

interface MultipleFilePreviewsProps {
  files: FilePreview[];
  prevFiles?: IPrevFiles[];
  setPrevFiles?: Dispatch<SetStateAction<IPrevFiles[]>>;
  setDeleteImages?: Dispatch<SetStateAction<string[]>>;
  onDelete: (index: number) => void;
  imageSize?: ResponsiveValue<string | number>;
}

const flexProps = {
  position: "relative" as PositionProps["position"],
  flexDir: "column" as const,
  gap: 4,
  flexShrink: 0,
  border: "1px solid",
  borderColor: "gray.200",
  borderRadius: "sm",
  overflow: "hidden",
  bg: "rgba(241,242,244,0.40)",
  role: "files",
  cursor: "pointer",
  align: "center",
  justify: "center",
  textAlign: "center" as const,
};

const textProps = {
  pos: "absolute" as PositionProps["position"],
  bottom: 0,
  left: 0,
  right: 0,
  bg: "white",
  opacity: 0.9,
  textColor: "black",
  fontSize: {
    base: "xs",
    sm: "sm",
  },
  p: 2,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const buttonProps = {
  alignSelf: "center",
  "aria-label": "Delete Image",
  icon: <Icon as={Trash} boxSize={4} />,
  borderRadius: "sm",
  colorScheme: "red",
  size: "xs",

  position: "absolute" as PositionProps["position"],
  top: 0,
  right: 0,
};

const MultipleFilePreviews: React.FC<MultipleFilePreviewsProps & FlexProps> = ({
  files,
  prevFiles,
  setPrevFiles,
  setDeleteImages,
  onDelete,
  imageSize,
  ...rest
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Flex gap={4} flexWrap={"wrap"} {...rest}>
      {prevFiles &&
        prevFiles?.length > 0 &&
        prevFiles?.map((file, index) => (
          <Flex {...flexProps} key={index}>
            <Skeleton isLoaded={!isImageLoaded}>
              <Image
                maxW={imageSize ?? "250px"}
                objectFit={"cover"}
                aspectRatio={1}
                src={file.url}
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
              />
            </Skeleton>
            <Text {...textProps}>{file.url.split("/").pop()!}</Text>

            <IconButton
              {...buttonProps}
              onClick={(e) => {
                e.stopPropagation();
                if (setPrevFiles) {
                  setPrevFiles((prevFiles) =>
                    prevFiles.filter((prevFile) => prevFile.id !== file.id)
                  );
                  setDeleteImages &&
                    setDeleteImages((ids) => [...ids, String(file.id)]);
                }
              }}
            />
          </Flex>
        ))}
      {files.map((file, index) => (
        <Flex {...flexProps} key={index}>
          <Skeleton isLoaded={!isImageLoaded}>
            <Image
              maxW={imageSize ?? "250px"}
              objectFit={"cover"}
              aspectRatio={1}
              src={file.url}
            />
          </Skeleton>
          {/* <Text {...textProps}>{file.fileName}</Text> */}
          <IconButton
            {...buttonProps}
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) {
                onDelete(index);
              }
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default MultipleFilePreviews;
