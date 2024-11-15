import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler } from "react-hook-form";

interface IModalForm {
  isOpen: boolean;
  onClose: () => void;
  heading: string;
  isFetching?: boolean;
  id?: number | null;
  onSubmit: SubmitHandler<any>;
  isLoading?: boolean;
  children: React.ReactNode;
  formId?: string;
}

const ModalForm: React.FC<IModalForm> = ({
  isOpen,
  onClose,
  heading,
  isFetching,
  id,
  onSubmit,
  isLoading,
  children,
  formId = "form",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInTop"
      preserveScrollBarGap
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        overflow={"hidden"}
        borderRadius={10}
        pos={"fixed"}
        maxH={"99dvh"}
        maxW={{ base: "98%", md: "80%", xl: "60%" }}
      >
        <ModalCloseButton />

        <ModalHeader
          bg={"primary.50"}
          color={"primary.600"}
          fontWeight={"bold"}
        >
          {heading}
        </ModalHeader>
        {isFetching && !!id ? (
          <Flex justify={"center"} align={"center"} h={"50vh"}>
            <Spinner
              size={"xl"}
              thickness="4px"
              speed="0.65s"
              color="primary.500"
            />
          </Flex>
        ) : (
          <ModalBody as={"form"} id={formId} onSubmit={onSubmit} noValidate>
            {children}
          </ModalBody>
        )}
        <ModalFooter gap={2}>
          <Button colorScheme="gray" variant={"outline"} onClick={onClose}>
            Close
          </Button>
          <Button form={formId} type={"submit"} isLoading={isLoading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
