import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleDataResponse } from "./service-response";

export interface SliderResponse {
  id: number;
  title?: string;
  subtitle?: string;
  image?: string;
  display_order?: string;
}

const useFetchSliders = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<SliderResponse>>({
    url: Api.Slider.fetch({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["sliders"],
  });
};

const useFetchSlider = (id: number) => {
  return useFetch<SingleDataResponse<SliderResponse>>({
    url: Api.Slider.fetchOne.replace(":id", id + ""),
    queryKey: ["slider", id],
    enabled: !!id,
  });
};

const useAddSlider = () => {
  {
    return useMutate<FormData>({
      url: Api.Slider.create,
      invalidates: ["sliders"],
      message: "Slider added successfully",
    });
  }
};

const useUpdateSlider = () => {
  return useMutate<FormData>({
    url: Api.Slider.update,
    invalidates: ["sliders", "slider"],
    message: "Slider updated successfully",
    method: "POST",
  });
};

const useDeleteSlider = () => {
  return useMutate({
    url: Api.Slider.delete,
    invalidates: ["sliders"],
    message: "Slider deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddSlider,
  useDeleteSlider,
  useFetchSlider,
  useFetchSliders,
  useUpdateSlider,
};
