import { FloatButton, Layout } from "antd";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import { RouteObjectWithNavbarSettings } from "../router/router.tsx";
import { HeaderNav } from "../components/navbar/HeaderNav.tsx";

const { Content } = Layout;

export const BaseLayout = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);
  const routeConfig = RouteObjectWithNavbarSettings.find((r) =>
    r.path?.includes(location.pathname)
  );
  const childrenComponent = routeConfig?.children?.filter(
    (c) => c.navPath === location.pathname
  )[0];

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <Helmet>
          <title>{childrenComponent?.title || "Landing Page Audit"}</title>
        </Helmet>
        <Layout
          style={{
            background: "none",
          }}
        >
          <HeaderNav />
          <Content
            style={{
              margin: "0 0 0 0",
              // background: "#ebedf0",
              borderRadius: 0,
              transition: "all .25s",
              padding: "10px 20px",
              minHeight: 360,
            }}
          >
            <div ref={nodeRef} style={{ background: "none" }}>
              <Outlet />
            </div>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
