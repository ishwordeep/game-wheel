import { TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import useGetErrors from "@/hooks/useGetErrors";
import {
  useAddWheel,
  useFetchWheel,
  useUpdateWheel,
} from "@/services/service-wheel";
import { Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  value: yup.string().required("Value is required"),
  win_ratio: yup
    .number()

    .required("Win Ratio is required")
    .typeError("Win Ratio must be a number"),
});

export type WheelFormData = yup.InferType<typeof schema>;

interface IWheelFormProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const WheelForm: FC<IWheelFormProps> = ({ isOpen, onClose, id }) => {
  const defaultValues = {
    value: "",
    win_ratio: "" as never as number,
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const { data: wheel, isPending, isFetching } = useFetchWheel(id!);
  const {
    mutateAsync: addWheel,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddWheel();

  const {
    mutateAsync: updateWheel,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateWheel();

  useEffect(() => {
    if (id) {
      reset({
        value: wheel?.data.value ?? "",
        win_ratio: wheel?.data.win_ratio ?? ("" as never as number),
      });
    } else {
      reset(defaultValues);
    }
  }, [id, wheel?.data]);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: WheelFormData) => {
    if (id) {
      const response = await updateWheel({ data, id });
      if (response.data.status) {
        onClose();
        setBackendError({});
        reset(defaultValues);
      }
    } else {
      const response = await addWheel({ data });
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
      heading={id ? "Edit Wheel" : "Add Wheel"}
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
          name="value"
          control={control}
          label="Value"
          backendError={backendError?.value}
          isRequired
        />
        <TextInput
          name="win_ratio"
          control={control}
          label="Win Ratio"
          type="number"
          backendError={backendError?.win_ratio}
          isRequired
        />
      </Stack>
    </ModalForm>
  );
};

export default WheelForm;
