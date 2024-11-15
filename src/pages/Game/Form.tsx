import { ReactDropzone, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import useGetDirtyData from "@/hooks/useGetDirtyData";
import useGetErrors from "@/hooks/useGetErrors";
import { toFormData } from "@/services/service-axios";
import {
  useAddGame,
  useFetchGame,
  useUpdateGame,
} from "@/services/service-game";
import { Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  agent_link: yup.string().required("Agent Link is required"),
  player_link: yup.string().required("Player Link is required"),
  image: yup.mixed().required("Image is required"),
  display_order: yup.number().typeError("Display Order must be a number"),
});

export type GameFormData = yup.InferType<typeof schema>;

interface IGameFormProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const GameForm: FC<IGameFormProps> = ({ isOpen, onClose, id }) => {
  const defaultValues = {
    name: "",
    agent_link: "",
    player_link: "",
    image: "",
    display_order: "" as never as number,
  };

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );
  const [removeImage, setRemoveImage] = useState<boolean>(false);
  const { data: game, isPending, isFetching } = useFetchGame(id!);
  const {
    mutateAsync: addGame,
    isPending: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddGame();

  const {
    mutateAsync: updateGame,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateGame();

  useEffect(() => {
    if (id) {
      reset({
        name: game?.data.name ?? "",
        agent_link: game?.data.agent_link ?? "",
        player_link: game?.data.player_link ?? "",
        image: game?.data.image ?? "",
        display_order: game?.data.display_order ?? ("" as never as number),
      });
    } else {
      reset(defaultValues);
    }
  }, [id, game?.data]);

  useEffect(() => {
    if (isAddError) {
      setBackendError(useGetErrors(addError));
    } else if (isUpdateError) {
      setBackendError(useGetErrors(updateError));
    }
  }, [isAddError, addError, isUpdateError, updateError]);

  const onSubmit = async (data: any) => {
    const formData = toFormData(id ? useGetDirtyData(formState, data) : data);
    if (removeImage) {
      formData.append("deleted_image", "true");
    }
    if (id) {
      const response = await updateGame({ data: formData, id });
      if (response.data.status) {
        onClose();

        setBackendError({});
        reset(defaultValues);
      }
    } else {
      const response = await addGame({ data: formData });
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
      heading={id ? "Edit Game" : "Add Game"}
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
        <TextInput
          name="agent_link"
          control={control}
          label="Agent Link"
          backendError={backendError?.agent_link}
          isRequired
        />
        <TextInput
          name="player_link"
          control={control}
          label="Player Link"
          backendError={backendError?.player_link}
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
          file={id && game?.data?.image ? game?.data?.image : ""}
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

export default GameForm;
