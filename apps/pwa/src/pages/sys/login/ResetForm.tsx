import { Button, Form, Input } from "antd";

import { ReturnButton } from "./components/ReturnButton";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";
import { SvgIcon } from "../../../components/icon";

function ResetForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const { loginState, backToLogin } = useLoginStateContext();

  if (loginState !== LoginStateEnum.RESET_PASSWORD) return null;

  return (
    <>
      <div className="mb-8 text-center">
        <SvgIcon icon="ic-reset-password" size="100" />
      </div>
      <div className="mb-4 text-center text-2xl font-bold xl:text-3xl">
        {"sys.login.forgetFormTitle"}
      </div>
      <Form
        name="normal_login"
        size="large"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <p className="mb-4 h-14 text-center text-gray">
          {"sys.login.forgetFormSecondTitle"}
        </p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "sys.login.emaildPlaceholder" }]}
        >
          <Input placeholder={"sys.login.email"} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-black">
            {"sys.login.sendEmailButton"}
          </Button>
        </Form.Item>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}

export default ResetForm;
