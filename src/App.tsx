import { Flex } from "@chakra-ui/react";
import { ReactNode, Suspense, useEffect } from "react";
import { Navigate, Outlet, Route, RouteObject, Routes } from "react-router-dom";
import { appRoutes } from "./router";
import { ROUTES } from "./router/routes";
import { useAuthentication, useLogout } from "./services/service-auth";
import { useFetchInitData } from "./services/service-index";
import Loader from "./utils/Loader";

// Define the shape of your route objects for better type safety
type AppRoute = RouteObject & {
  accessor?: string[];
  element: ReactNode;
  children?: AppRoute[];
};

const renderRoutes = (
  children: AppRoute[] | undefined,
  role: string | null
) => {
  return children
    ?.filter((childRoute) => {
      // Include routes if they have no accessor or the role is included in the accessor
      return (
        !childRoute.accessor || (role && childRoute.accessor.includes(role))
      );
    })
    .map((childRoute, childIndex) => (
      <Route
        key={childIndex}
        path={childRoute.path}
        element={childRoute.element}
        index={childRoute.index}
      />
    ));
};

const App = () => {
  const {
    data: isAuthenticated,
    isPending: isAuthLoading,
    isError,
  } = useAuthentication();
  const { mutateAsync: logout } = useLogout();

  // Fetching initial data in the app
  const { isLoading: isInitDataLoading, isError: isInitDataError } =
    useFetchInitData(!!isAuthenticated);

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      localStorage.getItem("token") ? logout() : null;
    }
  }, [isAuthenticated, logout]);

  if ((isAuthLoading || isInitDataLoading) && !isError && !isInitDataError) {
    return (
      <Flex h={"100dvh"} w={"100dvw"} justify={"center"} align={"center"}>
        <Loader />
      </Flex>
    );
  }

  function MissingRoute() {
    return <Navigate to={{ pathname: "/" }} />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {isAuthenticated ? (
          <>
            {appRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children && renderRoutes(route.children, null)}
              </Route>
            ))}
          </>
        ) : (
          <Route path="/" element={<Outlet />}>
            <Route index element={<ROUTES.Login />} />
            <Route path={"/login"} element={<ROUTES.Login />} />

            <Route path="*" element={<MissingRoute />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
