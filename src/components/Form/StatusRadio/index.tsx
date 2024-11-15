import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";

interface StatusRadioProps {
  control: Control<any>;
}

const statusRadioOptions = [
  {
    value: "1",
    label: "Active",
    id: "active",
  },
  {
    value: "0",
    label: "Inactive",
    id: "inactive",
  },
];

const StatusRadio = ({ control }: StatusRadioProps) => {
  return (
    <Controller
      name="is_active"
      control={control}
      defaultValue={"1"}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl my={2} isInvalid={!!error}>
          <FormLabel>Status</FormLabel>
          <RadioGroup onChange={onChange} value={value}>
            <HStack
              align={"center"}
              justify={"center"}
              w={"max-content"}
              gap={0}
            >
              {statusRadioOptions.map((option) => (
                <FormControl key={option.id}>
                  <Flex
                    as={FormLabel}
                    border={"1px solid"}
                    borderColor={
                      value === option.value
                        ? value === "1"
                          ? "teal.600"
                          : "red.200"
                        : "gray.200"
                    }
                    textColor={value === option.value ? "white" : "black"}
                    boxShadow={value === option.value ? "0 0 0 1px" : "none"}
                    htmlFor={option.id}
                    p={2}
                    align={"center"}
                    justify={"center"}
                    height={10}
                    borderRadius={5}
                    bg={
                      value === option.value
                        ? value === "1"
                          ? "teal.600"
                          : "red.500"
                        : "transparent"
                    }
                    cursor={"pointer"}
                  >
                    {option.label}
                  </Flex>
                  <Radio display={"none"} id={option.id} value={option.value} />
                </FormControl>
              ))}
            </HStack>
          </RadioGroup>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default StatusRadio;
