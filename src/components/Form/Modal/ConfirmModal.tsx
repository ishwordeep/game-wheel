import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
  Icon,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { WarningCircle } from "@phosphor-icons/react";
import { useRef } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  heading?: string;
  message?: string;
  onDelete: () => void;
  isLoading?: boolean;
  buttonLabel?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onDelete,
  heading,
  message,
  buttonLabel,
  isLoading,
}: ConfirmModalProps) => {
  const cancelRef = useRef(null);

  const [isLessThan450] = useMediaQuery("(max-width: 450px)");

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
      motionPreset="slideInTop"
    >
      <AlertDialogOverlay backdropFilter={"blur(1px)"} />
      <AlertDialogContent
        borderRadius={"12px"}
        boxShadow={
          "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)"
        }
        w={isLessThan450 ? "full" : "400px"}
        maxW={"98vw"}
      >
        <AlertDialogBody py={4}>
          <Flex flexDir={"column"} gap={4}>
            <Flex
              w={"fit-content"}
              borderRadius={"50%"}
              bg={"error.50"}
              p={"8px"}
              align={"center"}
              justify={"center"}
            >
              <Icon
                border={"8px solid var(--chakra-colors-error-100)"}
                borderRadius={"50%"}
                as={WarningCircle}
                boxSize={12}
                bg={"var(--chakra-colors-error-100)"}
                color={"red.500"}
              />
            </Flex>
            <Text fontWeight={600} fontSize={isLessThan450 ? "16px" : "20px"}>
              {heading}
            </Text>
            <Text>{message}</Text>
            <Flex
              flexDir={isLessThan450 ? "column-reverse" : "row"}
              w={"full"}
              align={"center"}
              gap={2}
            >
              <Button w={"full"} variant={"outline"} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={onDelete}
                isLoading={isLoading}
                w={"full"}
                colorScheme={"purple"}
              >
                {buttonLabel ?? "Confirm"}
              </Button>
            </Flex>
          </Flex>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
