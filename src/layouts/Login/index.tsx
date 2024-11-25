import { TextInput } from "@/components/Form";
import { useLogin } from "@/services/service-auth";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const LoginModal = () => {
  const defaultValues = {
    username: "",
    password: "",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: login, isPending } = useLogin();

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    const response = await login(data);

    if (response.data.success) {
      reset(defaultValues);
      onClose();
    }
  };

  return (
    <>
      <Button variant={"primary"} onClick={onOpen}>
        Login
      </Button>
      <Modal
        scrollBehavior="inside"
        motionPreset="slideInTop"
        isOpen={isOpen}
        onClose={() => {
          reset(defaultValues);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody
            as={"form"}
            id="login-form"
            onSubmit={handleSubmit(onSubmit)}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            <TextInput
              label={"Username"}
              isRequired
              name={"username"}
              control={control}
            />
            <TextInput
              label={"Password"}
              name={"password"}
              type="password"
              isRequired
              control={control}
            />
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                variant={"outline"}
                colorScheme="gray"
                onClick={() => {
                  reset(defaultValues);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                variant={"primary"}
                borderRadius={5}
                type={"submit"}
                form={"login-form"}
                isLoading={isPending}
              >
                Login
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
