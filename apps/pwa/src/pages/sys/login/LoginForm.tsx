import { Button } from "antd";

import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";
import { GoogleOutlined } from "@ant-design/icons";

function LoginForm() {
  const { loginState } = useLoginStateContext();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleGoogleSignIn = () => {
    window.open(import.meta.env.VITE_BE_URL + "/auth/google", "_self");
  };

  return (
    <>
      <div className="flex justify-center items-center  ">
        <Button
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center px-6 py-3 text-white bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full shadow-md transition duration-300 ease-in-out"
        >
          <span className="ml-2 text-gray-700 font-medium">
            Sign in with Google
          </span>
        </Button>
      </div>
    </>
  );
}

export default LoginForm;
