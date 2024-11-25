import LayoutWrapper from "@/layouts";
import { Outlet } from "react-router-dom";
import { ROUTES } from "./routes";

const appRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <ROUTES.Home />,
      },
      {
        path: "spin",
        element: <ROUTES.Spin />,
      },
      {
        path: "profile",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ROUTES.Profile />,
          },
          {
            path: "balance",
            element: <ROUTES.Balance />,
          },
        ],
      },
    ],
  },
];

export default appRoutes;
