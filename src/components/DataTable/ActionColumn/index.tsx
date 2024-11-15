import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { Pencil, Trash } from "@phosphor-icons/react";
import React from "react";

interface IActionColumn {
  handleEdit: () => void;
  handleDelete: () => void;
}

const ActionColumn: React.FC<IActionColumn> = ({
  handleEdit,
  handleDelete,
}) => {
  return (
    <HStack w={"max-content"} mx={"auto"}>
      <IconButton
        size={"sm"}
        aria-label="edit"
        icon={<Icon as={Pencil} boxSize={5} />}
        variant={"white"}
        color="blue.400"
        onClick={handleEdit}
      />
      <IconButton
        size={"sm"}
        aria-label="delete"
        color="red.400"
        variant={"white"}
        onClick={handleDelete}
        icon={<Icon as={Trash} boxSize={5} />}
      />
    </HStack>
  );
};

export default ActionColumn;
