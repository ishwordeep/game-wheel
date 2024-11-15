/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormControlProps, HStack, Icon } from "@chakra-ui/react";
import {
  chakraComponents,
  Select,
  SelectedOptionStyle,
} from "chakra-react-select";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { FormControl, selectStyles } from "../config";

interface OptionProps {
  icon?: any;
  isDisabled?: boolean;
  value: string | number;
  label: string;
}

interface ISelect {
  options: OptionProps[];
  placeholder?: string;
  name: string;
  control?: Control<any>;
  handleChange?: any;
  label?: string;
  value?: { value: string | number; label: string } | null;
  fieldError?: Record<string, string[]>;
  noOptionsMessage?: () => string;
  isControlled?: boolean;
  helperText?: string;
  backendError?: string[];
}

const SelectInput: FC<ISelect & FormControlProps> = ({
  options,
  name,
  control,
  handleChange,
  label,
  value,
  placeholder,
  noOptionsMessage,
  helperText,
  backendError,
  isControlled = true,
  ...rest
}) => {
  const customSingleValue = (props: any) => (
    <chakraComponents.SingleValue {...props}>
      <HStack fontSize={{ base: "14px", md: "16px" }} gap={1} align={"center"}>
        {props.data.icon && (
          <Icon
            weight={"fill"}
            as={props.data.icon}
            boxSize={5}
            color={"primary.500"}
          />
        )}
        {props.data.box && (
          <Box boxSize={5} borderRadius={"full"} bg={props.data.box} />
        )}
        <span>{props.data.label}</span>
      </HStack>
    </chakraComponents.SingleValue>
  );

  const customOption = (props: any) => (
    <chakraComponents.Option {...props}>
      <HStack gap={2} align={"center"}>
        {props.data.icon && <Icon as={props.data.icon} boxSize={5} />}
        {props.data.box && (
          <Box boxSize={5} borderRadius={"full"} bg={props.data.box} />
        )}
        <span>{props.data.label}</span>
      </HStack>
    </chakraComponents.Option>
  );

  const components = {
    SingleValue: customSingleValue,
    Option: customOption,
  };

  const selectAttributes = {
    selectedOptionStyle: "check" as SelectedOptionStyle,
    focusBorderColor: "primary.500",
    errorBorderColor: "error.500",
    placeholder: placeholder ?? "",
    size: "lg" as "lg",
    menuPortalTarget: document.body,
    options,
    components,
    noOptionsMessage,
  };

  return isControlled ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl
            label={label}
            helperText={helperText}
            error={!!error || !!backendError}
            errorText={backendError?.[0] ?? error?.message}
            name={name}
            {...rest}
          >
            <Select
              onChange={(option) => {
                handleChange && handleChange(option);
                onChange((option as { value: string })?.value);
                backendError = undefined;
              }}
              chakraStyles={selectStyles}
              value={
                options ? options.find((c) => c.value === value) || "" : ""
              }
              {...selectAttributes}
            />
          </FormControl>
        );
      }}
    />
  ) : (
    <FormControl label={label} helperText={helperText} name={name} {...rest}>
      <Select
        chakraStyles={selectStyles}
        value={value}
        defaultValue={options[0]}
        onChange={handleChange}
        {...selectAttributes}
      />
    </FormControl>
  );
};

export default SelectInput;
