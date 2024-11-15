import { lazy } from "react";

const Login = lazy(() => import("@/pages/Auth/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Slider = lazy(() => import("@/pages/Slider"));
const Game = lazy(() => import("@/pages/Game"));
const Payment = lazy(() => import("@/pages/Payment"));
const Wheel = lazy(() => import("@/pages/Wheel"));
const Rule = lazy(() => import("@/pages/Rule"));
const Settings = lazy(() => import("@/pages/Settings"));
const SpinRecord = lazy(() => import("@/pages/SpinRecord"));
const Users = lazy(() => import("@/pages/Users"));
export const ROUTES = {
  Login,
  Slider,
  Dashboard,
  Rule,
  Wheel,
  Payment,
  Game,
  Users,
  SpinRecord,
  Settings,
};
