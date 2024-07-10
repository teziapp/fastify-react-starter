import { Button, Form, Input } from "antd";

import { ReturnButton } from "./components/ReturnButton";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";

function RegisterForm() {
  const { loginState, backToLogin } = useLoginStateContext();
  if (loginState !== LoginStateEnum.REGISTER) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    backToLogin();
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">
        {"sys.login.signUpFormTitle"}
      </div>
      <Form
        name="normal_login"
        size="large"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "sys.login.accountPlaceholder" }]}
        >
          <Input placeholder={"sys.login.userName"} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "sys.login.emaildPlaceholder" }]}
        >
          <Input placeholder={"sys.login.email"} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "sys.login.passwordPlaceholder" }]}
        >
          <Input.Password type="password" placeholder={"sys.login.password"} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "sys.login.confirmPasswordPlaceholder",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("sys.login.diffPwd"));
              },
            }),
          ]}
        >
          <Input.Password
            type="password"
            placeholder={"sys.login.confirmPassword"}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {"sys.login.registerButton"}
          </Button>
        </Form.Item>

        <div className="mb-2 text-xs text-gray">
          <span>{"sys.login.registerAndAgree"}</span>
          <a href="./" className="text-sm !underline">
            {"sys.login.termsOfService"}
          </a>
          {" & "}
          <a href="./" className="text-sm !underline">
            {"sys.login.privacyPolicy"}
          </a>
        </div>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}

export default RegisterForm;
