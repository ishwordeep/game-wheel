import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface IEmptyState {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const EmptyState: FC<IEmptyState & FlexProps> = ({
  icon,
  title,
  description,
  children,
  ...rest
}) => {
  return (
    <Flex flexDir="column" align="center" justify="center" gap={1} {...rest}>
      {icon}
      <Text fontSize="xl" fontWeight={500}>
        {title}
      </Text>
      {description && (
        <Text fontSize="md" color="gray.500">
          {description}
        </Text>
      )}
      {children}
    </Flex>
  );
};

export default EmptyState;
