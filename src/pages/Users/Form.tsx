import { TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import useGetErrors from "@/hooks/useGetErrors";
import { useRegisterUser } from "@/services/service-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string(),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters long"),
});

export type IUserData = yup.InferType<typeof schema>;

interface IUserForm {
  id?: string | number | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserForm: FC<IUserForm> = ({ id, isOpen, onClose }) => {
  const defaultValues = {
    name: "",
    username: "",
    password: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

  const {
    mutateAsync: addUser,
    isError: isAddError,
    error: addError,
    isPending: isAdding,
  } = useRegisterUser();
  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    }
  }, [isAddError, addError]);

  const onSubmit = async (data: IUserData) => {
    const response = await addUser({ data });
    if (response.data.success) {
      onClose();
      reset(defaultValues);
      setBackendError({});
    }
  };

  return (
    <ModalForm
      heading={id ? "Edit User" : "Add User"}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset(defaultValues);
        setBackendError({});
      }}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isAdding}
    >
      <TextInput
        backendError={backendError?.name}
        name="name"
        label="Name"
        control={control}
      />
      <TextInput
        name="username"
        label="Username"
        control={control}
        backendError={backendError?.username}
        isRequired
      />
      <TextInput
        name="password"
        label="Password"
        control={control}
        isRequired
        backendError={backendError?.password}
      />
    </ModalForm>
  );
};

export default UserForm;
