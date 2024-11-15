import { Flex, FormLabel, ResponsiveValue, Switch } from "@chakra-ui/react";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { FormControl } from "../config";

interface ISwitchInput {
  name: string;
  control: Control<any>;
  label?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  colorScheme?: string;
  width?: ResponsiveValue<number | string>;
}

const SwitchInput: React.FC<ISwitchInput> = ({
  name,
  control,
  label,
  isRequired,
  isDisabled,
  isReadOnly,
  size,
  colorScheme,
  width,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl
          isRequired={isRequired}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          error={!!error}
          errorText={error?.message}
          width={width}
        >
          <Flex align={"center"} gap={2}>
            <FormLabel m={0} htmlFor={name}>
              {label}:
            </FormLabel>
            <Switch
              colorScheme={colorScheme ?? "primary"}
              isChecked={value}
              onChange={onChange}
              size={size ?? "md"}
              name={name}
            />
          </Flex>
        </FormControl>
      )}
    />
  );
};

export default SwitchInput;
