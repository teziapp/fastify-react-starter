import { Button } from "antd";

import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/LoginStateProvider";
import { GoogleOutlined } from "@ant-design/icons";
import { usePostHog } from 'posthog-js/react'

function LoginForm() {
  const { loginState } = useLoginStateContext();
  const posthog = usePostHog()

  if (loginState !== LoginStateEnum.LOGIN) { return null; }
  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleGoogleSignIn = () => {
    posthog?.capture('login_clicked', {
      timestamp: new Date().toISOString(),
      browser: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      language: navigator.language,
      platform: navigator.platform
    });
    window.open(import.meta.env.VITE_BE_URL + "/auth/login/google", "_self");
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
