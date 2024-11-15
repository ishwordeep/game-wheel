import { TextInput } from "@/components/Form";
import { ILogin, useLogin } from "@/services/service-auth";
import { Button, Card, Center, Container, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (data: ILogin) => {
    const response = await mutateAsync(data);
    if (response.data.success) {
      navigate("/", { replace: true });
    }
  };

  return (
    <Center as={Container} w={"100dvw"} h={"100dvh"}>
      <Card
        flexDir={"column"}
        variant={"outline"}
        gap={1}
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        boxShadow={"0px 1px 2px 0px rgba(16,24,40,0.1)"}
        maxW={"600px"}
        w={"full"}
        bg={"white"}
        borderRadius={5}
        p={{ base: 4, sm: 8, md: 16 }}
        noValidate
      >
        <Stack gap={4}>
          <Text textAlign={"center"} fontSize={"md"}>
            Welcome Back !
          </Text>

          <Text textAlign={"center"} fontSize={"xl"} fontWeight={600}>
            Login to your account
          </Text>
          <TextInput
            isRequired
            name="username"
            label="Username"
            control={control}
          />
          <TextInput
            isRequired
            name="password"
            label="Password"
            control={control}
            type="password"
          />

          <Button w={"full"} isLoading={isPending} type="submit">
            Login
          </Button>
        </Stack>
      </Card>
    </Center>
  );
};

export default Login;
