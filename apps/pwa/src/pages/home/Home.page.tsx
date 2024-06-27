import React from "react";
import { Button, Typography, Row } from "antd";
import { useAuth } from "../../hooks/useAuth";

const Home: React.FC = () => {
  const { session, signIn } = useAuth();
  return (
    <div style={{ width: "100%", justifyContent: "center" }}>
      {session === null && (
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
          gutter={[16, 16]}
        >
          <Typography.Text style={{ textAlign: "center" }}>
            Please login to continue
          </Typography.Text>
          <Button type="primary" onClick={signIn}>
            Google Auth
          </Button>
        </Row>
      )}
      {session?.user && (
        <Typography.Text style={{ textAlign: "center" }}>
          Welcome, {session.user.name}!
        </Typography.Text>
      )}
    </div>
  );
};

export default Home;
