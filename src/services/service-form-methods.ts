import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ApiClient } from "./service-axios";

interface IQueryProps {
  url: string;
  invalidates?: string[];
  defaultMessage?: boolean;
  message?: string;
  enabled?: boolean;
  queryKey?: (string | number)[];
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

export interface IData<T> {
  id?: string | number | null;
  data?: T;
}

//getMethod

const useFetch = <T>({ url, enabled, queryKey }: IQueryProps) => {
  const fetchData = (): Promise<AxiosResponse<T>> => {
    return ApiClient.get(url);
  };
  return useQuery({
    queryKey: queryKey ?? [url],
    queryFn: fetchData,
    select: (response) => response.data,
    placeholderData: keepPreviousData,
    enabled: enabled ?? true,
  });
};

const useMutate = <T>({
  url,
  invalidates,
  defaultMessage,
  message,
  method,
}: IQueryProps) => {
  const queryClient = useQueryClient();
  const sendData = ({ id, data }: IData<T>): Promise<AxiosResponse<any>> => {
    return method === "PUT"
      ? ApiClient.put(url.replace(":id", id as string), data)
      : method === "DELETE"
      ? ApiClient.delete(url.replace(":id", id as string))
      : method === "PATCH"
      ? ApiClient.patch(url.replace(":id", id as string), data)
      : method === "POST" && id
      ? ApiClient.post(url.replace(":id", id as string), data)
      : ApiClient.post(url, data);
  };

  return useMutation({
    mutationKey: [url],
    mutationFn: sendData,
    onSuccess: (response) => {
      if (invalidates) {
        invalidates.forEach((endpoint) => {
          queryClient.invalidateQueries({
            queryKey: [endpoint],
          });
        });
      }
      if (!defaultMessage && message) {
        toast.success(message);
      } else if (defaultMessage && !message) {
        toast.success((response.data as { message: string }).message);
      }
    },
    onError: (error: AxiosError<{ error: string; message: string }>) => {
      toast.error(
        !defaultMessage
          ? null
          : error?.response?.data?.error ??
              error?.response?.data?.message ??
              "An error occurred. Please try again later"
      );
    },
  });
};

export { useFetch, useMutate };
