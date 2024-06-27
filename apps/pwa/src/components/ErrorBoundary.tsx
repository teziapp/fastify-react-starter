import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Result, Button } from "antd";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={error.message || "An unexpected error occurred"}
      extra={[
        <Button type="primary" key="console" onClick={resetErrorBoundary}>
          Try again
        </Button>,
      ]}
    />
  );
}

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
