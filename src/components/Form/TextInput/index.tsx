import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  ResponsiveValue,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import React, { ReactNode, useState } from "react";
import { Control, Controller } from "react-hook-form";
import reactTextareaAutosize from "react-textarea-autosize";
import FormControl from "../config/FormControl";
import { inputProps } from "../config/inputProps";
interface ITextInputProps {
  isControlled?: boolean;
  value?: string;
  name: string;
  label?: string;
  control?: Control<any>;
  setValue?: (value: string) => void;
  placeholder?: string;
  backendError?: string[];
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  width?: ResponsiveValue<number | string>;
  type?: string;
  helperText?: string;
}

const TextInput: React.FC<ITextInputProps & InputProps & TextareaProps> = ({
  isControlled = true,
  value,
  setValue,
  placeholder,
  isDisabled,
  isReadOnly,
  isRequired,
  name,
  label,
  control,
  leftIcon,
  rightIcon,
  width,
  type,
  backendError,
  helperText,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return isControlled ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl
          error={!!error || !!backendError}
          errorText={backendError?.[0] ?? error?.message}
          label={label}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          width={width}
          name={name}
          helperText={helperText}
        >
          {type === "textarea" ? (
            <Textarea
              {...inputProps}
              as={reactTextareaAutosize}
              minH={0}
              minRows={5}
              maxRows={10}
              placeholder={placeholder ?? ""}
              value={value}
              onChange={onChange}
              {...restProps}
            />
          ) : (
            <InputGroup>
              {!!leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
              <Input
                {...inputProps}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                autoComplete={type === "password" ? "new-password" : "off"}
                value={value}
                placeholder={placeholder ?? ""}
                onChange={(value) => {
                  onChange(value);
                  backendError = undefined;
                }}
                {...restProps}
              />
              {type === "password" && !rightIcon && (
                <InputRightElement mt={1}>
                  <IconButton
                    aria-label="toggle-password"
                    me={2}
                    icon={
                      <Icon as={showPassword ? Eye : EyeClosed} boxSize={6} />
                    }
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    colorScheme="gray"
                  />
                </InputRightElement>
              )}
              {!!rightIcon && type !== "password" && (
                <InputLeftElement>{rightIcon}</InputLeftElement>
              )}
            </InputGroup>
          )}
        </FormControl>
      )}
    />
  ) : (
    <InputGroup>
      {!!leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
      <Input
        {...inputProps}
        placeholder={placeholder ?? ""}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
      {!!rightIcon && <InputRightElement mt={1}>{rightIcon}</InputRightElement>}
    </InputGroup>
  );
};

export default TextInput;
