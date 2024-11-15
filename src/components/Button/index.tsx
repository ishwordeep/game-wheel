import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { FC } from "react";

interface IButtonProps {
  label?: string;
}

export const AddButton: FC<IButtonProps & ButtonProps> = ({
  label,
  ...rest
}) => {
  return (
    <Button leftIcon={<Icon as={Plus} boxSize={5} />} {...rest}>
      {label ?? "Add"}
    </Button>
  );
};
