import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { session, loading, signIn } = useAuth();

  useEffect(() => {
    if (session?.user && !loading) {
      navigate("/", { replace: true });
    }
  }, [session, loading]);

  if (session == null) {
    return (
      <Result
        status="error"
        title="Failed to Authenticate!"
        subTitle="Please try again."
        extra={[
          <Button type="primary" onClick={signIn}>
            Login
          </Button>,
        ]}
      />
    );
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

export default AuthSuccess;
