import {
  ClockCounterClockwise,
  CreditCard,
  ExclamationMark,
  GameController,
  House,
  Slideshow,
  SpinnerBall,
  Users,
} from "@phosphor-icons/react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: House,
    to: "/",
  },
  {
    title: "Slider",
    icon: Slideshow,
    to: "/slider",
  },
  {
    title: "Game",
    icon: GameController,
    to: "/game",
  },
  {
    title: "Payment",
    icon: CreditCard,
    to: "/payment",
  },
  {
    title: "Wheel",
    icon: SpinnerBall,
    to: "/wheel",
  },
  {
    title: "Rule",
    icon: ExclamationMark,
    to: "/rule",
  },
  {
    title: "Spin Record",
    icon: ClockCounterClockwise,
    to: "/spin-record",
  },
  {
    title: "Users",
    icon: Users,
    to: "/users",
  },
];
