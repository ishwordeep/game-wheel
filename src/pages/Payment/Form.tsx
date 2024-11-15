import { ReactDropzone, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import useGetDirtyData from "@/hooks/useGetDirtyData";
import useGetErrors from "@/hooks/useGetErrors";
import { toFormData } from "@/services/service-axios";
import {
  useAddPayment,
  useFetchPayment,
  useUpdatePayment,
} from "@/services/service-payment";
import { Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.mixed().required("Image is required"),
});

export type PaymentsFormData = yup.InferType<typeof schema>;

interface IPaymentsFormProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const PaymentsForm: FC<IPaymentsFormProps> = ({ isOpen, onClose, id }) => {
  const defaultValues = {
    name: "",

    image: "",
  };

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const [removeImage, setRemoveImage] = useState<boolean>(false);
  const { data: payments, isPending, isFetching } = useFetchPayment(id!);
  const {
    mutateAsync: addPayments,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddPayment();

  const {
    mutateAsync: updatePayments,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdatePayment();

  useEffect(() => {
    if (id) {
      reset({
        name: payments?.data.name ?? "",
        image: payments?.data.image ?? "",
      });
    } else {
      reset(defaultValues);
    }
  }, [id, payments?.data]);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: PaymentsFormData) => {
    const formData = toFormData(id ? useGetDirtyData(formState, data) : data);
    if (removeImage) {
      formData.append("deleted_image", "true");
    }
    if (id) {
      const response = await updatePayments({ data: formData, id });
      if (response.data.status) {
        onClose();

        setBackendError({});
        reset(defaultValues);
      }
    } else {
      const response = await addPayments({ data: formData });
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
      heading={id ? "Edit Payments" : "Add Payments"}
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
          name="name"
          control={control}
          label="Name"
          backendError={backendError?.name}
          isRequired
        />

        <ReactDropzone
          name="image"
          control={control}
          label="Image"
          options={{
            accept: { "image/png": [] },
            maxSize: 3,
          }}
          backendError={backendError?.image}
          file={id && payments?.data?.image ? payments?.data?.image : ""}
          isRequired
          setRemoveImage={setRemoveImage}
          aspectRatio={1}
        />
      </Stack>
    </ModalForm>
  );
};

export default PaymentsForm;
