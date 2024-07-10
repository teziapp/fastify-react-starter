import { ReactNode } from "react";
import AuthGuard from "./components/auth-guard";
import {
  createBrowserRouter,
  IndexRouteObject,
  Navigate,
  NonIndexRouteObject,
} from "react-router-dom";
import { ErrorPage } from "../pages/Error.page";
import DashboardLayout from "../layouts/dashboard";
import Page404 from "../pages/Error/Page404";

type PageProps = {
  component: ReactNode;
};

export type NavbarFields = {
  navLabel?: string;
  navPath?: string;
  icon?: ReactNode;
  subheader?: string;
  title?: string;
  showInNav?: boolean; // New field to control visibility in nav
};

const PageWrapper = ({ component }: PageProps) => {
  return <AuthGuard>{component}</AuthGuard>;
};

export type RouteObjectWithNavbar =
  | (IndexRouteObject & NavbarFields)
  | (Omit<NonIndexRouteObject, "children"> & {
      children?: RouteObjectWithNavbar[];
    } & NavbarFields);

export const RouteObjectWithNavbar: RouteObjectWithNavbar[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Navigate to="/dashboard" replace />,
        index: true,
        showInNav: false,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PageWrapper component={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    showInNav: true,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/dashboard",
        lazy: async () => {
          const { Workbench } = await import("../pages/dashboard/workbench");
          return { element: <PageWrapper component={<Workbench />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/dashboard",
        navLabel: "Dashboard",
        title: "Dashboard",
        subheader: "Dashboard",
        showInNav: true,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/auth/login",
        lazy: async () => {
          const { Login } = await import("../pages/sys/login/Login");
          return { element: <PageWrapper component={<Login />} /> };
        },
        navPath: "/auth/login",
        navLabel: "Login",
        title: "Login",
        subheader: "Login",
        showInNav: false,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/auth/success",
        lazy: async () => {
          const { AuthSuccess } = await import(
            "../pages/sys/login/AuthSuccess"
          );
          return { element: <AuthSuccess /> };
        },
        navPath: "/auth/success",
        navLabel: "Auth Redirect",
        title: "Auth Redirect",
        subheader: "Auth Redirect",
        showInNav: false,
      },
    ],
  },
  {
    path: "/*",
    element: <Page404 />,
    children: [],
    showInNav: false,
  },
];

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(RouteObjectWithNavbar);
