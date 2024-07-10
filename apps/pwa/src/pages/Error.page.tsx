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
          {error instanceof Error
            ? error.message
            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              error?.statusText ?? "Unknown error"}
        </Paragraph>
      </div>
    </Result>
  );
};
