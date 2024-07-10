import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Result, Tooltip, Typography } from "antd";
import SimpleLayout from "../../layouts/simple";
import { LeftOutlined, SyncOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Error = unknown | any;

export const ErrorPage = () => {
  const navigate = useNavigate();

  const error: Error = useRouteError();
  console.error(error);

  return (
    <SimpleLayout>
      <Result
        status="error"
        title="Oops!"
        subTitle="Sorry, an unexpected error has occurred."
        extra={[
          <Tooltip title="Navigate to previous page">
            <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Tooltip>,
          <Button icon={<SyncOutlined />} onClick={() => navigate(0)}>
            Refresh page
          </Button>,
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
          <Paragraph copyable>{error.statusText || error.message}</Paragraph>
        </div>
      </Result>
    </SimpleLayout>
  );
};
