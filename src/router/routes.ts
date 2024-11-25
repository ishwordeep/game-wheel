import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Spin = lazy(() => import("@/pages/Spin"));
const Profile = lazy(() => import("@/pages/Profile"));
const Balance = lazy(() => import("@/pages/Profile/Balance"));
export const ROUTES = {
  Home,
  Spin,
  Profile,
  Balance,
};
