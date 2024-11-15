import { RuleFormData } from "@/pages/Rule/Form";
import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleDataResponse } from "./service-response";

export interface RuleResponse {
  id: number;
  title: string;
  description: string;
  display_order?: number;
}

const useFetchRules = ({ page = 1, perPage = 10, keyword = "" }) => {
  return useFetch<RootResponse<RuleResponse>>({
    url: Api.Rule.fetch({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["rules"],
  });
};

const useFetchRule = (id: number) => {
  return useFetch<SingleDataResponse<RuleResponse>>({
    url: Api.Rule.fetchOne.replace(":id", id + ""),
    queryKey: ["rule", id],
    enabled: !!id,
  });
};

const useAddRule = () => {
  {
    return useMutate<RuleFormData>({
      url: Api.Rule.create,
      invalidates: ["rules"],
      message: "Rule added successfully",
    });
  }
};

const useUpdateRule = () => {
  return useMutate<RuleFormData>({
    url: Api.Rule.update,
    invalidates: ["rules", "rule"],
    message: "Rule updated successfully",
    method: "POST",
  });
};

const useDeleteRule = () => {
  return useMutate({
    url: Api.Rule.delete,
    invalidates: ["rules"],
    message: "Rule deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddRule,
  useDeleteRule,
  useFetchRule,
  useFetchRules,
  useUpdateRule,
};
