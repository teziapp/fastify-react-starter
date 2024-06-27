import { SessionType } from "@repo/utils";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { trpcFetch } from "../trpc/trpcFetch";

export interface AuthContextType {
  session: SessionType | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
  updateSession: (newSession: SessionType | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<SessionType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkUser = async () => {
    const sessionDetails = sessionStorage.getItem("sessionDetails");
    try {
      if (sessionDetails) {
        const session = JSON.parse(decodeURIComponent(sessionDetails));
        setSession({
          ...session,
          user: session.user[0],
        });
        if (window.location.pathname === "/login") {
          window.location.href = "/";
        }
      } else {
        setLoading(true);
        const result = await trpcFetch.user.query();
        setLoading(false);
        if (result) {
          const encodedSession = encodeURIComponent(JSON.stringify(result));
          sessionStorage.setItem("sessionDetails", encodedSession);
          setSession({
            // @ts-ignore
            ...result,
            // @ts-ignore
            user: result.user[0],
          });
          if (window.location.pathname === "/login") {
            window.location.href = "/";
          }
        } else {
          setSession(null);
          sessionStorage.removeItem("sessionDetails");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      sessionStorage.removeItem("sessionDetails");
      setSession(null);
      sessionStorage.removeItem("sessionDetails");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (session == null && !loading) {
      checkUser();
    }
  }, []);

  const signIn = () => {
    window.open(import.meta.env.VITE_BE_URL + "/auth/google", "_self");
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_BE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      sessionStorage.removeItem("sessionDetails");
      setSession(null);
      window.location.href = "/login";
      setLoading(false);
    } catch (error) {
      console.error("Error during sign out:", error);
      sessionStorage.removeItem("sessionDetails");
      setSession(null);
      setLoading(false);
      window.location.href = "/login";
    }
  };

  const updateSession = (newSession: SessionType | null) => {
    setSession(newSession);
    if (newSession) {
      const encodedSession = encodeURIComponent(JSON.stringify(newSession));
      sessionStorage.setItem("sessionDetails", encodedSession);
    } else {
      sessionStorage.removeItem("sessionDetails");
    }
  };

  const value: AuthContextType = {
    session,
    loading,
    signIn,
    signOut,
    updateSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
