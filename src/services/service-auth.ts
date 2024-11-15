import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api } from "./service-api";
import { ApiClient } from "./service-axios";
import TokenService from "./service-token";

export const authTokenKey = "authTokenKey";
export const authTokenDetails = "authTokenDetails";
export const Authorities = {
  superadmin: "superadmin",
  admin: "admin",
};
export interface ILogin {
  username: string;
  password: string;
}

const initLogin = (data: ILogin) => {
  return ApiClient.post(Api.Auth.login, data);
};

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [Api.Auth.login],
    mutationFn: initLogin,
    onSuccess: (response) => {
      const token = {
        token: response.data.token,
        expiresIn: new Date().getTime() + 60 * 60 * 1000,
      };
      TokenService.setToken(token);
      queryClient.setQueryData([authTokenKey], () => true);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const err = error as AxiosError<{ error: string; message: string }>;

      toast.error(
        err.response?.data.message ?? err.response?.data.error ?? "Login Failed"
      );
    },
  });
};

const initLogout = () => {
  try {
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: initLogout,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData([authTokenKey], () => false);
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout Failed");
    },
  });
};

const checkAuthentication = async () => {
  if (TokenService.isAuthenticated()) {
    const tokenInfo = TokenService.getToken();
    if (tokenInfo && tokenInfo.expiresIn > Date.now()) {
      return Promise.resolve(true);
    } else {
      TokenService.clearToken();
      return Promise.resolve(false);
    }
  } else {
    return Promise.resolve(false);
  }
};

/**
 * Check if user is authenticated
 * @returns boolean
 */

const useAuthentication = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [authTokenKey],
    queryFn: async () => {
      const authStatus = await checkAuthentication();
      const tokenDetails = TokenService.getToken();
      if (tokenDetails) {
        queryClient.setQueryData([authTokenDetails], {
          ...tokenDetails,
        });
      }
      return authStatus;
    },
  });
};

export { checkAuthentication, useAuthentication, useLogin, useLogout };
