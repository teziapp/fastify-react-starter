import { Helmet } from "react-helmet-async";
import { App as AntdApp } from "antd";
import AntdConfig from "./theme/antd";
import GlobalDrawer from "./components/globalDrawer/GlobalDrawer";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { MotionLazy } from "./components/animate/motion-lazy";
import { META_TITLE, META_DESCRIPTION, APP_FAVICON } from "./appConfig";

export const App = () => {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>{META_TITLE}</title>
            <meta name="description" content={META_DESCRIPTION} />
            <link rel="icon" href={APP_FAVICON} />
          </Helmet>
          <GlobalDrawer />
          <RouterProvider router={router} />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
};