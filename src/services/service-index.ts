import { useInitDataStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Api } from "./service-api";
import { ApiClient } from "./service-axios";
import { useFetch } from "./service-form-methods";
import { RootResponse } from "./service-response";
export interface RootInterface<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IInitDataResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    username: string;
    is_active: number;
    total_balance: number;
  };
  can_spin: boolean;
}

export interface SliderResponse {
  id: number;
  subtitle: string;
  display_order: number;
  image: string;
}

export interface GameResponse {
  id: number;
  name: string;
  agent_link: string;
  player_link: string;
  display_order: number;
  image: string;
}

export interface PaymentResponse {
  id: number;
  name: string;
  image: string;
}
const useFetchSliders = () => {
  return useFetch<RootResponse<SliderResponse>>({
    url: "/slider",
    queryKey: ["sliders"],
  });
};

const useFetchGames = () => {
  return useFetch<RootResponse<GameResponse>>({
    url: "/game",
    queryKey: ["games"],
  });
};

const useFetchPayments = () => {
  return useFetch<RootResponse<PaymentResponse>>({
    url: "/payment",
    queryKey: ["payments"],
  });
};

const fetchInitData = () => {
  return ApiClient.get<IInitDataResponse>(Api.Auth.me);
};

const useFetchInitData = (enabled: boolean) => {
  const { setInitData } = useInitDataStore();
  return useQuery({
    queryKey: ["initData"],
    queryFn: async () => {
      const initData = await fetchInitData();
      setInitData(initData?.data);
      return initData;
    },
    enabled,
    retry: 1,
  });
};

export { useFetchGames, useFetchInitData, useFetchPayments, useFetchSliders };
