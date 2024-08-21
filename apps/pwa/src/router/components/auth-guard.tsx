import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { trpc } from "@/trpc/trpc";
import { useUserActions } from "../../store/userStore";

import { usePathname, useRouter } from "../hooks";
import PageError from "../../pages/Error/PageError";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const profile = trpc.auth.profile.useQuery(undefined,{
    retry: 2,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
  const { setUserInfo } = useUserActions();

  const check = useCallback(() => {
    if (profile.isError || (!profile.data && profile.isFetched)) {
      if (pathname !== "/auth/login") {
        router.replace("/auth/login");
      }
    } else if (profile.data) {
      setUserInfo(profile.data);
    }
  }, [profile.isLoading]);

  useEffect(() => {
    if (!profile.isLoading) {
      check();
    }
  }, [check, profile.isLoading]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  );
}