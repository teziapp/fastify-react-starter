import { Button, Col, Row, Typography } from "antd";

const Register = () => {
  const handleGoogleAuth = () => {
    window.open(import.meta.env.VITE_BE_URL + "/auth/google", "_self");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
      }}
    >
      <Row style={{ width: "100%" }}>
        <Col
          span={24}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography.Title
            level={1}
            style={{
              fontSize: "5rem",
              textAlign: "center",
              padding: 0,
            }}
          >
            Fastify + React + Antd Boilerplate
          </Typography.Title>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col
          span={24}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography.Title
            level={1}
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Simple and easy to use
          </Typography.Title>
        </Col>
      </Row>
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
        <Button type={"primary"} onClick={handleGoogleAuth}>
          Google Auth
        </Button>
      </Row>
    </div>
  );
};

export default Register;
