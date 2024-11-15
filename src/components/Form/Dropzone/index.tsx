/* eslint-disable @typescript-eslint/no-explicit-any */
// import { BaseURL } from "@/api/axiosSetup";
import {
  Flex,
  FlexProps,
  Icon,
  ResponsiveValue,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { CloudArrowUp, Plus } from "@phosphor-icons/react";
import convert from "convert";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Dropzone, { Accept, FileRejection } from "react-dropzone";
import { Control, Controller } from "react-hook-form";
import { FormControl } from "../config";
import MultipleFilePreviews from "./MultipleFilePreview";
import SingleFilePreview from "./SingleFilePreview";

interface FileErrorProps {
  type: string;
  message: string;
}

interface IPrevFiles {
  id: number;
  url: string;
}

interface PreviewProps {
  url: string;
  fileName: string;
  fileType: string;
}

type DropzoneProps = {
  name: string;
  prevFiles?: IPrevFiles[];
  setPrevFiles?: Dispatch<SetStateAction<IPrevFiles[]>>;
  setRemoveImage?: Dispatch<SetStateAction<boolean>>;
  control?: Control<any>;
  label?: string;
  setDeleteImages?: Dispatch<SetStateAction<string[]>>;
  backendError?: string[];
  file?: string | null;
  isRequired?: boolean;
  helperText?: string;
  message?: string;
  isMultiple?: boolean;
  imageSize?: ResponsiveValue<string | number>;
  width?: ResponsiveValue<string | number>;
  boxWidth?: ResponsiveValue<string | number>;
  boxHeight?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  imageOrder?: number;
  flexDir?: "row" | "column";
  aspectRatio?: number;
  noMaxSize?: boolean;
  options: {
    accept?: Accept;
    maxSize?: number;
  };
  dropbox?: ReactNode;
};

function ReactDropzone({
  name,
  control,
  isMultiple,
  message,
  label,
  file,
  isRequired,
  helperText,
  boxWidth,
  boxHeight,
  prevFiles,
  setPrevFiles,
  setDeleteImages,
  setRemoveImage,
  noMaxSize,
  backendError,
  width,
  options,
  imageSize,
  aspectRatio,
  flexDir,
  dropbox,
  imageOrder,
  ...rest
}: DropzoneProps & FlexProps) {
  const { colorMode } = useColorMode();
  const { accept, maxSize } = options;

  const [acceptedFileList, setAcceptedFileList] = useState<Blob[]>([]);
  // const [rejectedFileList, setRejectedFileList] = useState<FileRejection[]>([]);

  const [preview, setPreview] = useState<PreviewProps[]>([]);
  const [fileError, setFileError] = useState<FileErrorProps | undefined>(
    undefined
  );

  useEffect(() => {
    if (file) {
      setPreview([
        {
          url: file,
          fileName: file.split("/").pop()!,
          fileType: file.split(".").pop()!,
        },
      ]);
    }
    1;
  }, [file]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        useEffect(() => {
          if (file) {
            onChange(file);
          }
        }, [file]);

        const handleFileDrop: <T extends File>(
          acceptedFiles: T[],
          rejectedFiles: FileRejection[]
        ) => void | undefined = (acceptedFiles, rejectedFiles) => {
          if (rejectedFiles.length > 0) {
            const errorCode = rejectedFiles[0].errors[0].code;
            const errorMessage =
              rejectedFiles[0].errors[0].code === "file-too-large"
                ? `File size should be less than ${maxSize ?? 3} MB`
                : rejectedFiles[0].errors[0].message;
            setFileError({ type: errorCode, message: errorMessage });
          } else {
            setFileError(undefined);
          }

          acceptedFiles.forEach((file) => {
            const filePreview = {
              url: URL.createObjectURL(file),
              fileName: file.name,
              fileType: file.type,
            };

            if (isMultiple) {
              setAcceptedFileList((prev) => [...prev, file]);
              setPreview((prev) => [...prev, filePreview]);
            } else {
              setAcceptedFileList([file]);
              setPreview([filePreview]);
            }
            onChange(
              isMultiple
                ? [...acceptedFileList, ...acceptedFiles]
                : acceptedFiles[0]
            );
          });
        };
        return (
          <FormControl
            width={width ?? { base: "150px", md: "200px" }}
            label={label}
            helperText={helperText}
            error={!!error || !!backendError || !!fileError}
            errorText={
              backendError?.[0] ?? error?.message ?? fileError?.message
            }
            name={name}
            isRequired={isRequired}
          >
            <Flex
              flexDir={flexDir ?? isMultiple ? "row" : "column"}
              gap={4}
              flexWrap={"wrap"}
              {...rest}
            >
              {isMultiple &&
                (preview.length > 0 ||
                  (prevFiles && prevFiles?.length > 0)) && (
                  <MultipleFilePreviews
                    order={imageOrder}
                    files={preview}
                    prevFiles={prevFiles || []}
                    setDeleteImages={setDeleteImages}
                    setPrevFiles={setPrevFiles}
                    imageSize={imageSize}
                    onDelete={(index) => {
                      setPreview(preview.filter((_, i) => i !== index));
                      setAcceptedFileList(
                        acceptedFileList.filter((_, i) => i !== index)
                      );
                    }}
                  />
                )}
              <Dropzone
                onDrop={(acceptedFiles, rejectedFiles) => {
                  handleFileDrop(acceptedFiles, rejectedFiles);
                }}
                maxSize={
                  maxSize
                    ? convert(maxSize, "MB").to("bytes")
                    : noMaxSize
                    ? undefined
                    : convert(3, "MB").to("bytes")
                }
                accept={accept ?? { "*/*": [".*"] }}
                multiple={!!isMultiple}
              >
                {({ getRootProps, getInputProps }) => (
                  <Flex
                    flexDir="column"
                    {...getRootProps()}
                    w={boxWidth ?? { base: "150px", md: "200px" }}
                    h={boxHeight}
                    aspectRatio={aspectRatio}
                    border={"2px solid rgba(200, 204, 209, 0.70)"}
                    bg={"rgba(241, 242, 244, 0.40)"}
                    p={2}
                    cursor={"pointer"}
                    borderColor={"gray.300"}
                    gap={4}
                    align={"center"}
                    textAlign={"center"}
                    justify={"center"}
                    borderRadius={"sm"}
                  >
                    <input {...getInputProps()} />
                    {!isMultiple && preview.length === 0 ? (
                      <Flex flexDir={"column"} gap={2} align={"center"}>
                        <Icon as={CloudArrowUp} boxSize={10} />
                        <Text>Select a file </Text>
                        {message && (
                          <Text
                            color={
                              colorMode === "light" ? "gray.800" : "gray.100"
                            }
                            fontSize="sm"
                          >
                            {message}
                          </Text>
                        )}
                      </Flex>
                    ) : (
                      !dropbox &&
                      isMultiple && (
                        <Flex flexDir={"column"} gap={2} align={"center"}>
                          <Icon as={Plus} boxSize={12} />
                        </Flex>
                      )
                    )}
                    {dropbox && isMultiple && dropbox}
                    {!isMultiple && preview.length > 0 && (
                      <SingleFilePreview
                        url={preview[0].url}
                        fileName={preview[0].fileName ?? ""}
                        onDelete={() => {
                          setPreview([]); // Clear the preview
                          setAcceptedFileList([]); // Clear the accepted files list
                          setRemoveImage && setRemoveImage(true);
                        }}
                      />
                    )}
                  </Flex>
                )}
              </Dropzone>
            </Flex>
          </FormControl>
        );
      }}
    />
  );
}

export default ReactDropzone;
