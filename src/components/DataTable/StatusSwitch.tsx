import { useMutate } from "@/services/service-form-methods";
import { Switch } from "@chakra-ui/react";
import { toast } from "react-toastify";

interface IStatusProps {
  model: string;
  id: string | number | null;
}

const useUpdateStatus = ({ model, id }: IStatusProps) => {
  return useMutate({
    url: `toggle-status/${model}/${id}`,
    invalidates: [`${model}s`],
    enabled: !!id,
    method: "POST",
    queryKey: [`${model}s`],
    message: "Status updated successfully.",
  });
};

interface StatusSwitchProps extends IStatusProps {
  isActive: boolean;
}

const StatusSwitch = ({ isActive, id, model }: StatusSwitchProps) => {
  const { mutateAsync } = useUpdateStatus({ id, model });

  const handleChange = async () => {
    try {
      if (id !== null) {
        await mutateAsync({
          id: String(id),
          data: {
            is_active: !isActive,
          },
        });
      } else {
        toast.error("Something went wrong");
        console.error("Invalid id: id cannot be null");
      }
      // Handle success if needed
    } catch (error) {
      toast.error("Something went wrong");

      // Handle error if needed
      console.error("Error updating status:", error);
    }
  };

  return (
    <Switch isChecked={isActive} colorScheme="red" onChange={handleChange} />
  );
};

export default StatusSwitch;
