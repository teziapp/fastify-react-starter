// scroll bar
import 'simplebar/src/simplebar.css';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';
import { clarity } from 'react-microsoft-clarity';
import { useEffect } from 'react';
import { PostHogProvider } from 'posthog-js/react'
import { CLARITY_ID } from "./app-config";
import { AuthProvider } from "@/auth/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { trpc, trpcClient, queryClient } from "./trpc/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SettingsProvider } from "@/component/settings/settingContext";
import ScrollToTop from '@/component/ScrollToTop';
import { MotionLazyContainer } from '@/component/animate';
import ThemeProvider from '@/theme';
import SnackbarProvider from '@/component/snackbar/SnackbarProvider';
import Router from '@/routes';

// Add these constants for PostHog configuration
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

export const App = () => {
  useEffect(() => {
    clarity.init(CLARITY_ID);
  }, []);

  return (
    <AuthProvider>
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <MotionLazyContainer>
              <ThemeProvider>
                <SnackbarProvider>
                  <trpc.Provider client={trpcClient} queryClient={queryClient}>
                    <QueryClientProvider client={queryClient}>
                      <ReactQueryDevtools initialIsOpen={false} />
                      <PostHogProvider apiKey={POSTHOG_KEY} options={{ api_host: POSTHOG_HOST }}>
                        <Router />
                      </PostHogProvider>
                    </QueryClientProvider>
                  </trpc.Provider>
                </SnackbarProvider>
              </ThemeProvider>
            </MotionLazyContainer>
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    </AuthProvider>
  );
};