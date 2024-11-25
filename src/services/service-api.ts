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

const Slider = {
  create: "/admin/slider",
  update: "/admin/slider/:id",
  delete: "/admin/slider/:id",
  fetch: ({ page, perPage, keyword }: IPagination) => {
    let url = `/slider?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    console.log({ url });
    return url;
  },
  fetchOne: "/admin/slider/:id",
};

const Game = {
  create: "/admin/game",
  update: "/admin/game/:id",
  delete: "/admin/game/:id",
  fetch: ({ page, perPage, keyword }: IPagination) => {
    let url = `/admin/game?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  fetchOne: "/admin/game/:id",
};

const Payment = {
  create: "/admin/payment",
  update: "/admin/payment/:id",
  delete: "/admin/payment/:id",
  fetch: ({ page, perPage, keyword }: IPagination) => {
    let url = `/payment?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  fetchOne: "/admin/payment/:id",
};

const Wheel = {
  create: "/admin/wheel",
  update: "/admin/wheel/:id",
  delete: "/admin/wheel/:id",
  fetch: ({ page, perPage, keyword }: IPagination) => {
    let url = `/admin/wheel?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  fetchOne: "/admin/wheel/:id",
};

const Rule = {
  create: "/admin/rule",
  update: "/admin/rule/:id",
  delete: "/admin/rule/:id",
  fetch: ({ page, perPage, keyword }: IPagination) => {
    let url = `/admin/rule?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
  fetchOne: "/admin/rule/:id",
};

const SpinRecord = {
  fetch: ({ page, perPage, keyword }: IPagination) => {
    let url = `/admin/spin-record?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
};

const UserList = {
  fetch: ({ page, perPage, keyword }: IPagination) => {
    let url = `/users-list?page=${page}&per_page=${perPage}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return url;
  },
};

export const Api = {
  Auth,
  Game,
  Payment,
  Rule,
  Wheel,
  Slider,
  SpinRecord,
  UserList,
};
