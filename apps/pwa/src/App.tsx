import { Helmet } from "react-helmet-async";
import { App as AntdApp } from "antd";
import AntdConfig from "./theme/antd";
import GlobalDrawer from "./components/globalDrawer/GlobalDrawer";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { MotionLazy } from "./components/animate/motion-lazy";

export const App = () => {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>Tezi React-fastify boilerplate</title>
            {/* <link rel="icon" href={"path to your favicon"} /> */}
          </Helmet>
          <GlobalDrawer />
          <RouterProvider router={router} />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
};
