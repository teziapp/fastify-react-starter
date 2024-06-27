import { PieChartOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { FC, ReactNode, useEffect } from "react";
import {
  IndexRouteObject,
  Navigate,
  NonIndexRouteObject,
  useLocation,
} from "react-router-dom";
import { BackBtn, RefreshBtn } from "tezi-antd-components";
import { ErrorPage } from "../pages/Error.page";
import { Login } from "../pages/auth/Login.page";
import { BaseLayout } from "../pages/base.layout";
import { useAuth } from "../hooks/useAuth";
import AuthSuccess from "../pages/auth/Success.page";
import ServiceWorkerUpdateDialog from "../components/ServiceWorkerUpdate";

// Custom scroll restoration function
export const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  component: ReactNode;
};
const PageWrapper = ({ component }: PageProps) => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <>
      <ScrollToTop />
      <ServiceWorkerUpdateDialog />
      {component}
    </>
  );
};

type NavbarFields = {
  navLabel?: string;
  navPath?: string; // needed when the actual path has urlParams
  icon?: ReactNode;
  subheader?: string;
  title?: string;
};

export type RouteObjectWithNavbar =
  | (IndexRouteObject & NavbarFields)
  | (Omit<NonIndexRouteObject, "children"> & {
      children: RouteObjectWithNavbar[];
    } & NavbarFields);

export const RouteObjectWithNavbarSettings: RouteObjectWithNavbar[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Navigate to="/home" replace />,
        index: true,
      },
    ],
  },
  {
    path: "/auth-success",
    errorElement: <ErrorPage />,
    element: <PageWrapper component={<AuthSuccess />} />,
    children: [],
  },
  {
    path: "/home",
    element: <PageWrapper component={<BaseLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/home",
        lazy: async () => {
          const { Home } = await import("../pages/home/Home.page");
          return { element: <PageWrapper component={<Home />} /> };
        },
        icon: <PieChartOutlined />,
        navPath: "/home",
        navLabel: "Home",
        title: "Home",
        subheader: "Home",
      },
    ],
  },
  {
    path: "/login",
    children: [
      {
        element: <Login />,
        index: true,
      },
    ],
  },
  {
    path: "/*",
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Page Not Found!"
        extra={[
          <BackBtn type="primary" key="back" />,
          <RefreshBtn key="refresh" />,
        ]}
      />
    ),
    children: [],
  },
];
