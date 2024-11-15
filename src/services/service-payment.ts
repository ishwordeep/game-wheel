import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleDataResponse } from "./service-response";

export interface PaymentResponse {
  id: number;
  name: string;
  image?: string;
}

const useFetchPayments = ({ page = 1, perPage = 2, keyword = "" }) => {
  return useFetch<RootResponse<PaymentResponse>>({
    url: Api.Payment.fetch({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["payments"],
  });
};

const useFetchPayment = (id: number) => {
  return useFetch<SingleDataResponse<PaymentResponse>>({
    url: Api.Payment.fetchOne.replace(":id", id + ""),
    queryKey: ["payment", id],
    enabled: !!id,
  });
};

const useAddPayment = () => {
  {
    return useMutate<FormData>({
      url: Api.Payment.create,
      invalidates: ["payments"],
      message: "Payment added successfully",
    });
  }
};

const useUpdatePayment = () => {
  return useMutate<FormData>({
    url: Api.Payment.update,
    invalidates: ["payments", "payment"],
    message: "Payment updated successfully",
    method: "POST",
  });
};

const useDeletePayment = () => {
  return useMutate({
    url: Api.Payment.delete,
    invalidates: ["payments"],
    message: "Payment deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddPayment,
  useDeletePayment,
  useFetchPayment,
  useFetchPayments,
  useUpdatePayment,
};
