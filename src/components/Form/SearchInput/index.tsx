import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  ResponsiveValue,
  Spinner,
  TextareaProps,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { debounce } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { FormControl, inputProps } from "../config";

interface ISearchInputProps {
  value?: string;
  name?: string;
  label?: string;
  setValue?: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  width?: ResponsiveValue<number | string>;
  helperText?: string;
  my?: ResponsiveValue<number | string>;
}

const SearchInput: React.FC<ISearchInputProps & InputProps & TextareaProps> = ({
  value,
  onSearch,
  placeholder,
  isDisabled,
  isReadOnly,
  isRequired,
  name,
  label,
  width,
  helperText,
  my,
  ...rest
}) => {
  const [searchString, setSearchString] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedSearchFunction = useCallback(
    (value: string) => {
      onSearch(value);
      setIsDebouncing(false);
    },
    [onSearch]
  );

  const debouncedOnSearch = useMemo(() => {
    return debounce(debouncedSearchFunction, 500);
  }, [debouncedSearchFunction]);

  const handleSearch = (value: string) => {
    setIsDebouncing(true);
    setSearchString(value);
    debouncedOnSearch(value);
  };

  return (
    <FormControl
      label={label}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      width={width}
      name={name}
      helperText={helperText}
      my={my}
    >
      <InputGroup {...rest}>
        <InputLeftElement mt={1}>
          {isDebouncing ? (
            <Spinner boxSize={5} color="gray.500" />
          ) : (
            <Icon
              as={MagnifyingGlass}
              boxSize={6}
              color="gray.500"
              weight="light"
            />
          )}
        </InputLeftElement>
        <Input
          {...inputProps}
          boxShadow={"base"}
          placeholder={placeholder ?? ""}
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(searchString);
            }
          }}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchInput;
