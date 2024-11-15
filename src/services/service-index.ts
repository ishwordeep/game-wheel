import { useStoreInitData } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Api } from "./service-api";
import { ApiClient } from "./service-axios";
import { useFetch } from "./service-form-methods";
import { RootResponse } from "./service-response";

export interface SpinRecordResponse {
  id: number;
  wheel: {
    id?: number;
    value?: string;
  };
  user: {
    id?: number;
    name?: string;
  };
}

export interface UserListResponse {
  id: number;
  name: string;
  username: string;
  is_active: number;
  total_balance: number;
  image: string;
}

export interface RootInterface {
  success: boolean;
  message: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: number;
  role: string;
}

const fetchInitData = () => {
  return ApiClient.get<RootInterface>(Api.Auth.me);
};

const useFetchInitData = (enabled: boolean) => {
  const { setInitData } = useStoreInitData();

  return useQuery({
    queryKey: ["initData"],
    queryFn: async () => {
      const initData = await fetchInitData();
      setInitData(initData?.data?.user);
      return initData;
    },
    enabled,
    retry: 1,
  });
};

const useFetchSpinRecords = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<SpinRecordResponse>>({
    url: Api.SpinRecord.fetch({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["spinRecords"],
  });
};

const useFetchUserLists = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<UserListResponse>>({
    url: Api.UserList.fetch({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["userLists"],
  });
};

export { useFetchInitData, useFetchSpinRecords, useFetchUserLists };
