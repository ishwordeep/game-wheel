import { TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import useGetErrors from "@/hooks/useGetErrors";
import {
  useAddRule,
  useFetchRule,
  useUpdateRule,
} from "@/services/service-rule";
import { Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  display_order: yup.number().typeError("Display Order must be a number"),
});

export type RuleFormData = yup.InferType<typeof schema>;

interface IRuleFormProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const RuleForm: FC<IRuleFormProps> = ({ isOpen, onClose, id }) => {
  const defaultValues = {
    title: "",
    description: "",
    display_order: "" as never as number,
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const { data: rule, isPending, isFetching } = useFetchRule(id!);
  const {
    mutateAsync: addRule,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddRule();

  const {
    mutateAsync: updateRule,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateRule();

  useEffect(() => {
    console.log({ id });
  }, [id]);

  useEffect(() => {
    if (id) {
      reset({
        title: rule?.data.title ?? "",
        description: rule?.data.description ?? "",
        display_order: rule?.data.display_order ?? ("" as never as number),
      });
    } else {
      reset(defaultValues);
    }
  }, [id, rule?.data]);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: RuleFormData) => {
    if (id) {
      const response = await updateRule({ data, id });
      if (response.data.status) {
        onClose();

        setBackendError({});
        reset(defaultValues);
      }
    } else {
      const response = await addRule({ data });
      if (response.data.status) {
        onClose();
        setBackendError({});

        reset(defaultValues);
      }
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      heading={id ? "Edit Rule" : "Add Rule"}
      onClose={() => {
        onClose();
        setBackendError({});
        reset(defaultValues);
      }}
      id={id}
      isLoading={isAdding || isUpdating}
      isFetching={isPending || isFetching}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack gap={0}>
        <TextInput
          name="title"
          control={control}
          label="Title"
          backendError={backendError?.title}
          isRequired
        />
        <TextInput
          name="description"
          type="textarea"
          control={control}
          label="Description"
          backendError={backendError?.description}
          isRequired
        />
        <TextInput
          name="display_order"
          control={control}
          label="Display Order"
          type="number"
          backendError={backendError?.display_order}
          isRequired
        />
      </Stack>
    </ModalForm>
  );
};

export default RuleForm;
