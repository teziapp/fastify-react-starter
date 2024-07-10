import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useRouter } from "../hooks";
import { useUserInfo, useUserToken } from "../../store/userStore";
import PageError from "../../pages/Error/PageError";

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const user = useUserInfo();
  console.info("user", user);
  const { exp } = useUserToken();

  const check = useCallback(() => {
    if (!exp) {
      router.replace("/auth/login");
    }
  }, [router, exp]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  );
}
