import { Helmet } from "react-helmet-async";
import { App as AntdApp } from "antd";
import AntdConfig from "./theme/antd";
import GlobalDrawer from "./components/globalDrawer/GlobalDrawer";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { MotionLazy } from "./components/animate/motion-lazy";
import { clarity } from 'react-microsoft-clarity';
import { useEffect } from 'react';
import { PostHogProvider } from 'posthog-js/react'
import { APP_FAVICON, CLARITY_ID, META_DESCRIPTION, META_TITLE } from "./appConfig";

// Add these constants for PostHog configuration
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

export const App = () => {
  useEffect(() => {
    clarity.init(CLARITY_ID);
  }, []);

  return (
    <PostHogProvider 
      apiKey={POSTHOG_KEY}
      options={{
        api_host: POSTHOG_HOST,
      }}
    >
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
    </PostHogProvider>
  );
};