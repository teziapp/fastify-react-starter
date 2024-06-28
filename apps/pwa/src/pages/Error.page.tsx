import { Result, Typography } from "antd";
import { useRouteError } from "react-router-dom";
import { BackBtn, RefreshBtn } from "common-components";

const { Paragraph, Text } = Typography;

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="error"
      title="Oops!"
      subTitle="Sorry, an unexpected error has occurred."
      extra={[
        <BackBtn type="primary" key="back" />,
        <RefreshBtn key="refresh" />,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The page you tried to open has the following error:
          </Text>
        </Paragraph>
        <Paragraph copyable>
          {/* @ts-expect-error error is of unknown type */}
          {error instanceof Error
            ? error.message
            : error?.statusText ?? "Unknown error"}
        </Paragraph>
      </div>
    </Result>
  );
};
