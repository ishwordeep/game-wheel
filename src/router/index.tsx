import LayoutWrapper from "@/layouts";
import { Center } from "@chakra-ui/react";
import { ROUTES } from "./routes";

const appRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <ROUTES.Dashboard />,
        // accessor: [Authorities.admin, Authorities.superadmin],
      },
      {
        path: "slider",
        element: <ROUTES.Slider />,
      },
      {
        path: "game",
        element: <ROUTES.Game />,
      },
      {
        path: "payment",
        element: <ROUTES.Payment />,
      },
      {
        path: "wheel",
        element: <ROUTES.Wheel />,
      },
      {
        path: "rule",
        element: <ROUTES.Rule />,
      },
      {
        path: "spin-record",
        element: <ROUTES.SpinRecord />,
      },
      {
        path: "users",
        element: <ROUTES.Users />,
      },
      {
        path: "settings",
        element: <ROUTES.Settings />,
      },
      {
        path: "*",
        element: (
          <Center h={"70dvh"} w={"full"}>
            404 Not Found
          </Center>
        ),
      },
    ],
  },
];

export { appRoutes };
