import { WheelFormData } from "@/pages/Wheel/Form";
import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleDataResponse } from "./service-response";

export interface WheelResponse {
  id: number;
  value: string;
  win_ratio: number;
}

const useFetchWheels = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<WheelResponse>>({
    url: Api.Wheel.fetch({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["wheels"],
  });
};

const useFetchWheel = (id: number) => {
  return useFetch<SingleDataResponse<WheelResponse>>({
    url: Api.Wheel.fetchOne.replace(":id", id + ""),
    queryKey: ["wheel", id],
    enabled: !!id,
  });
};

const useAddWheel = () => {
  {
    return useMutate<WheelFormData>({
      url: Api.Wheel.create,
      invalidates: ["wheels", "wheel"],
      message: "Wheel added successfully",
    });
  }
};

const useUpdateWheel = () => {
  return useMutate<WheelFormData>({
    url: Api.Wheel.update,
    invalidates: ["wheels"],
    message: "Wheel updated successfully",
    method: "POST",
  });
};

const useDeleteWheel = () => {
  return useMutate({
    url: Api.Wheel.delete,
    invalidates: ["wheels"],
    message: "Wheel deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddWheel,
  useDeleteWheel,
  useFetchWheel,
  useFetchWheels,
  useUpdateWheel,
};
