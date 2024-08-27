import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { CircleLoading } from "../../components/loading";
import { trpc } from "../../trpc/trpc";
import { useUserActions, useUserToken } from "../../store/userStore";
import { useRouter } from "../../router/hooks";

export const AuthSuccess: React.FC = () => {
  const router = useRouter();
  const { exp } = useUserToken();
  const { setUserInfo, setUserToken } = useUserActions();
  const userSession = trpc.user.useQuery(undefined, {
    retry: 2,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
  useEffect(() => {
    if (exp) {
      router.replace("/");
    } else if (userSession.data) {
      setUserToken({ exp: userSession.data.exp.toString() });
      setUserInfo(userSession.data);
      router.replace("/");
    }
  }, [exp, router, userSession.data, setUserToken, setUserInfo]);

  if (userSession.isError) {
    return (
      <Result
        status="error"
        title="Failed to Authenticate!"
        subTitle="Please try again."
        extra={[
          <Button type="primary" onClick={() => router.replace("/auth/login")}>
            Login
          </Button>,
        ]}
      />
    );
  } else if (userSession.isLoading) {
    <CircleLoading />;
  } else {
    return (
      <Result
        status="success"
        title="Successfully Authenticated!"
        subTitle="Redirecting..."
      />
    );
  }
};
