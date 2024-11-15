import { ReactDropzone, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import useGetDirtyData from "@/hooks/useGetDirtyData";
import useGetErrors from "@/hooks/useGetErrors";
import { toFormData } from "@/services/service-axios";
import {
  useAddSlider,
  useFetchSlider,
  useUpdateSlider,
} from "@/services/service-slider";
import { Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string(),
  image: yup.mixed().required("Image is required"),
  display_order: yup.string().typeError("Display Order is required"),
});

export type SlidersFormData = yup.InferType<typeof schema>;

interface ISlidersFormProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const SlidersForm: FC<ISlidersFormProps> = ({ isOpen, onClose, id }) => {
  const defaultValues = {
    title: "",
    subtitle: "",
    image: "",
    display_order: "",
  };

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const [removeImage, setRemoveImage] = useState<boolean>(false);
  const { data: sliders, isPending, isFetching } = useFetchSlider(id!);
  const {
    mutateAsync: addSliders,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddSlider();

  const {
    mutateAsync: updateSliders,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateSlider();

  useEffect(() => {
    if (id) {
      reset({
        subtitle: sliders?.data.subtitle ?? "",
        display_order: sliders?.data.display_order ?? "",
        image: sliders?.data.image ?? "",
      });
    } else {
      reset(defaultValues);
    }
  }, [id, sliders?.data]);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: SlidersFormData) => {
    const formData = toFormData(id ? useGetDirtyData(formState, data) : data);
    if (removeImage) {
      formData.append("deleted_image", "true");
    }
    if (id) {
      const response = await updateSliders({ data: formData, id });
      if (response.data.status) {
        onClose();

        setBackendError({});
        reset(defaultValues);
      }
    } else {
      const response = await addSliders({ data: formData });
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
      heading={id ? "Edit Sliders" : "Add Sliders"}
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
          name="subtitle"
          control={control}
          label="Sub Title"
          backendError={backendError?.subtitle}
          isRequired
        />

        <ReactDropzone
          name="image"
          control={control}
          label="Image"
          options={{
            accept: { "image/*": [] },
            maxSize: 5,
          }}
          backendError={backendError?.image}
          file={id && sliders?.data?.image ? sliders?.data?.image : ""}
          isRequired
          setRemoveImage={setRemoveImage}
          aspectRatio={1}
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

export default SlidersForm;
