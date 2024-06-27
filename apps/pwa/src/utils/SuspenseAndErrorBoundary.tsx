import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Space, Spin, Result } from "antd";
import { ReloadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { version } from "../../package.json";

const { Text, Paragraph } = Typography;

const ErrorFallback: React.FC<{
  error: any;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => {
  const locationNow = location.pathname;
  const navigate = useNavigate();

  console.error("Error Fallback", { error });

  useEffect(() => {
    if (error.status === 401) resetErrorBoundary();
  }, [error, resetErrorBoundary]);

  const extra = (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Text>version: {version}</Text>
      <Text>url: {locationNow + window.location.search}</Text>
      <Space>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => navigate(0)}
          type="primary"
        >
          Reload
        </Button>
      </Space>
      <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
        {error.message || ""}
      </Paragraph>
      <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
        {error.stack || ""}
      </Paragraph>
    </Space>
  );

  return (
    <Result
      status="error"
      title="Something Went Wrong"
      subTitle={
        <Space direction="vertical">
          <Text>Try to reload this page or restart the app</Text>
          <Text>
            Please send the screenshot of this page to{" "}
            <a href="tel:9638051000">9638051000</a> or{" "}
            <a href="tel:7575806994">7575806994</a>
          </Text>
        </Space>
      }
      extra={extra}
    />
  );
};

const SuspenseFallBack: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Spin size="large" />
  </div>
);

interface SuspenseAndErrorBoundaryProps {
  children: React.ReactNode;
  suspenseUI?: React.ReactNode;
}

const SuspenseAndErrorBoundary: React.FC<SuspenseAndErrorBoundaryProps> = ({
  children,
  suspenseUI,
}) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={suspenseUI || <SuspenseFallBack />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

export default SuspenseAndErrorBoundary;
