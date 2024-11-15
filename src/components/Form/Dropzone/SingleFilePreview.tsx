// SingleFilePreview.tsx

import LazyImage from "@/components/LazyImage";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";
import React from "react";

interface SingleFilePreviewProps {
  url: string;
  fileName: string;
  onDelete: () => void;
}

const SingleFilePreview: React.FC<SingleFilePreviewProps> = ({
  url,
  fileName,
  onDelete,
}) => {
  return (
    <Flex gap={2} flexDir="column" position="relative" overflow={"hidden"}>
      <LazyImage
        w={"full"}
        aspectRatio={1}
        objectFit="cover"
        objectPosition={"center"}
        border={"1px"}
        borderColor={"gray.500"}
        padding={2}
        src={url}
      />
      <Text
        pos={"absolute"}
        bottom={0}
        left={0}
        right={0}
        bg={"white"}
        opacity={0.9}
        textColor={"black"}
        fontSize={{ base: "xs", sm: "sm" }}
        p={2}
        overflow={"hidden"}
        whiteSpace={"nowrap"} // Prevent text wrapping
        textOverflow={"ellipsis"} // Truncate text with ellipsis
      >
        {fileName}
      </Text>

      <IconButton
        alignSelf={"center"}
        aria-label="Delete Image"
        icon={<Icon as={Trash} boxSize={5} />}
        borderRadius={"sm"}
        colorScheme="red"
        size="sm"
        position="absolute"
        top={0}
        right={0}
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
      />
    </Flex>
  );
};

export default SingleFilePreview;
