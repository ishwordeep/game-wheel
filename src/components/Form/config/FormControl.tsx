import {
  FormControl as CFormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  ResponsiveValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface IFormControl {
  label?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  helperText?: string;
  width?: ResponsiveValue<number | string>;
  children: ReactNode;
  name?: string;
  error?: boolean;
  errorText?: string;
  my?: ResponsiveValue<number | string>;
}

const FormControl: React.FC<IFormControl & FormControlProps> = ({
  children,
  label,
  helperText,
  width,
  name,
  error,
  errorText,
  my,
  ...rest
}) => {
  return (
    <CFormControl my={my ?? 2} isInvalid={error} w={"100%"} {...rest}>
      {label && (
        <FormLabel mb={2} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      {children}
      {helperText && (
        <FormHelperText fontStyle={"italic"} color={"gray.500"} mt={2}>
          *{helperText}
        </FormHelperText>
      )}
      <FormErrorMessage>{errorText}</FormErrorMessage>
    </CFormControl>
  );
};

export default FormControl;
