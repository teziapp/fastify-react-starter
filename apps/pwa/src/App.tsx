import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { AntdThemeProvider } from "tezi-antd-components";
import { router } from "./router";
import { queryClient, trpc, trpcClient } from "./trpc/trpc";
import { AuthProvider } from "./contexts/authContext";
import { Suspense } from "react";
import { Spin } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { App as AntdApp } from "antd";

export const App = () => {
  return (
    <HelmetProvider>
      <AntdThemeProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <Suspense
                fallback={<Spin size="large" style={{ height: "50%" }} />}
              >
                <AuthProvider>
                  <AntdApp>
                    <RouterProvider router={router} />
                  </AntdApp>
                </AuthProvider>
              </Suspense>
            </ErrorBoundary>
          </QueryClientProvider>
        </trpc.Provider>
      </AntdThemeProvider>
    </HelmetProvider>
  );
};
