import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { usePostHog } from "posthog-js/react";
import { trpc } from '@/trpc/trpc';
import { AuthContextType, AuthStateType } from '@/auth/types';
import localStorageAvailable from '@/utils/localStorageAvailable';
import { trpcFetch } from '@/trpc/trpcFetch';

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthStateType>(initialState);
  const posthog = usePostHog();
  const utils = trpc.useUtils();
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    if (location.pathname === "/auth/login") {
      return setAuthState(prev => ({ ...prev, isInitialized: true }));
    }

    const profile = await trpcFetch.auth.profile.query().catch(() => null);

    if (profile?.user?.id && profile?.user?.email) {
      setAuthState({
        isInitialized: true,
        isAuthenticated: true,
        user: {
          ...profile.user,
          role: "user",
          profilePicture: profile.user.profilePicture || undefined,
        },
      });
    } else {
      setAuthState({
        isInitialized: true,
        isAuthenticated: false,
        user: null,
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async () => {
    posthog?.capture("login_button_clicked", {
      timestamp: new Date().toISOString(),
      browser: navigator.userAgent,
      referrer: document.referrer || "Direct",
      language: navigator.language,
      platform: navigator.platform,
    });
    window.open(import.meta.env.VITE_BE_URL + "/auth/login/google", "_self");
  }, []);

  const logout = useCallback(() => {
    trpc.auth.logout.useMutation({
      onSuccess() {
        utils.auth.profile.reset();
        setAuthState({
          isInitialized: true,
          isAuthenticated: false,
          user: null,
        });
      },
    })
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: authState.isInitialized,
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      login,
      logout,
    }),
    [authState.isAuthenticated, authState.isInitialized, authState.user, login, logout]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

