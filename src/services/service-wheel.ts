import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "./service-axios";
import { useFetch } from "./service-form-methods";
import { RootResponse } from "./service-response";

export interface WheelValueResponse {
  id: number;
  value: string;
  display_name: string;
}

const useFetchWheelValues = (enabled: boolean) => {
  return useFetch<RootResponse<WheelValueResponse>>({
    url: "/wheel-values",
    queryKey: ["wheel-values"],
    enabled,
  });
};

const fetchWinningValues = () => {
  return ApiClient.get("/winning-value");
};

const useFetchWinningValues = (enabled: boolean) => {
  return useQuery({
    queryKey: ["winning-values"],
    enabled,
    queryFn: fetchWinningValues,
    select: (response) => response.data,
  });
};

export { useFetchWheelValues, useFetchWinningValues };
