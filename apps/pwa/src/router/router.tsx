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
import { trpc } from "../trpc/trpc";
import { router } from ".";

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

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ component }: PageProps) => {
  try {
    const user = trpc.user.useQuery();
    console.info(user.data);
    if (user !== undefined) {
      const userJson = JSON.stringify(user.data);
      const encodedUser = encodeURIComponent(userJson);
      sessionStorage.setItem("userDetails", encodedUser);
    } else {
      console.info("No user found");
      router.navigate("/login");
    }
  } catch (e) {
    console.error(e);
    router.navigate("/login");
  }

  return (
    <>
      <ScrollToTop />
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
