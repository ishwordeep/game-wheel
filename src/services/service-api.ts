export interface IPagination {
  page?: number;
  perPage?: number;
  keyword?: string;
}

const Auth = {
  login: "/login",
  me: "/user",
  register: "/register",
  forgot: "/forgot-password",
  reset: "/reset-password",
};

export const Api = {
  Auth,
};
