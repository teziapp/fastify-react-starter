import { QueryClientProvider } from "@tanstack/react-query";
import { AntdThemeProvider } from "common-components";
import { queryClient, trpc, trpcClient } from "./trpc/trpc";
import { AuthProvider } from "./contexts/authContext";
import { HelmetProvider } from "react-helmet-async";
import { App as AntdApp } from "antd";
import Router from "./router/router";
import { MotionLazyContainer } from "./components/animate";
import { BrowserRouter } from "react-router-dom";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";

export const App = () => {
  return (
    <HelmetProvider>
      <AntdThemeProvider>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <MotionLazyContainer>
              <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                  <AuthProvider>
                    <AntdApp>
                      <Router />
                    </AntdApp>
                  </AuthProvider>
                </QueryClientProvider>
              </trpc.Provider>
            </MotionLazyContainer>
          </BrowserRouter>
        </CollapseDrawerProvider>
      </AntdThemeProvider>
    </HelmetProvider>
  );
};
