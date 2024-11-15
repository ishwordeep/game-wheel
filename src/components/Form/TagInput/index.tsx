import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputProps,
  Tag,
  TagCloseButton,
  TextareaProps,
  useColorMode,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

interface TagInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  isRequired?: boolean;
  required?: boolean;
  backendError?: string[];
}
const TagInput: React.FC<TagInputProps & InputProps & TextareaProps> = ({
  name,
  control,
  label,
  isRequired,
  required,
  backendError,
  ...extraProps
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [currentValue, setCurrentValue] = useState<string>("");
  const [dataInput, setDataInput] = useState<string[]>([]);

  const addTag = () => {
    if (currentValue.trim().length > 0) {
      setDataInput([...dataInput, currentValue.trim().replace(",", "")]);
      setCurrentValue("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "," || event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      addTag();
    } else if (
      event.key === "Backspace" &&
      currentValue.length === 0 &&
      dataInput.length > 0
    ) {
      setDataInput(dataInput.slice(0, -1));
    }
  };

  const handleDeleteItem = (index: number) => {
    const dataInputTemp = [...dataInput];
    dataInputTemp.splice(index, 1);
    setDataInput(dataInputTemp);
  };

  const { colorMode } = useColorMode();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        useEffect(() => {
          onChange(dataInput);
        }, [dataInput]);

        useEffect(() => {
          if (value?.length > 0 && dataInput.length === 0) {
            setDataInput(value);
          }
        }, [value]);

        return (
          <FormControl
            id={name}
            isRequired={!!isRequired}
            isInvalid={!!error || !!backendError}
            my={2}
          >
            <FormLabel mb={2}>{label}</FormLabel>
            <HStack
              outline={"2px solid transparent"}
              outlineOffset={"2px"}
              transition={"outline-offset 0.15s, outline-width 0.15s"}
              border={"1px solid"}
              borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
              borderRadius={5}
              pos={"relative"}
              cursor={"text"}
              _focusWithin={{
                zIndex: 1,
                boxShadow: `0 0 0 1px var(--chakra-colors-primary-500)`,
                borderColor: "primary.500",
              }}
              w={"100%"}
              flexWrap={"wrap"}
              onBlur={() => {
                addTag();
              }}
              bg={colorMode === "light" ? "white" : "gray.800"}
              onClick={() => inputRef.current?.focus()}
              px={2}
              minH={"var(--chakra-sizes-12)"}
              shadow={"sm"}
              boxShadow={"0px 1px 2px 0px rgba(16, 24, 40, 0.05)"}
              data-has-value={dataInput?.length > 0}
            >
              {dataInput.map((text, i) => (
                <Tag
                  my={"4px"}
                  fontSize={{ base: "12px", md: "14px" }}
                  colorScheme="white"
                  border={"1px solid var(--chakra-colors-gray-300)"}
                  borderRadius={5}
                  boxShadow={"0px 1px 2px 0px rgba(16, 24, 40, 0.2)"}
                  key={i + "_" + text}
                  alignItems={"center"}
                >
                  {text}
                  <TagCloseButton
                    onClick={() => handleDeleteItem(i)}
                    boxSize={4}
                  />
                </Tag>
              ))}
              <Input
                sx={{
                  border: 0,
                  outline: 0,
                  width: `${currentValue?.length + 1}ch`,
                  minH: "unset",
                  p: 0,
                }}
                ref={inputRef}
                _hover={{ border: "none" }}
                _focus={{ border: "none" }}
                placeholder={""}
                onKeyDown={handleKeyPress}
                fontSize={{ base: "14px", md: "16px" }}
                onChange={(e) => setCurrentValue(e.target.value)}
                value={currentValue ?? ""}
                isInvalid={!!error}
                errorBorderColor={"red.500"}
                boxShadow="none !important"
                {...extraProps}
              />
            </HStack>

            <FormErrorMessage ml={2} paddingTop={2}>
              {backendError ? backendError?.[0] : error ? error?.message : ""}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
};

export default TagInput;
