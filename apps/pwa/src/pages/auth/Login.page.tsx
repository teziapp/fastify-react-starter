import { Flex, Layout } from "antd";
import Color from "color";
import { Navigate } from "react-router-dom";
import DashboardImg from "../../assets/images/background/dashboard.png";
import Overlay2 from "../../assets/images/background/overlay_2.jpg";
import LoginForm from "../sys/login/LoginForm";
import { LoginStateProvider } from "../sys/login/providers/LoginStateProvider";
import RegisterForm from "../sys/login/RegisterForm";
import ResetForm from "../sys/login/ResetForm";
import { useThemeToken } from "../../theme/hooks";
import { Logo } from "../../components/Logo/Logo";
import { useUserToken } from "@/store/userStore";
import { APP_NAME } from "@/appConfig";

export function Login() {
	const {exp} = useUserToken()
  console.log("hello Karan")
  const { colorBgElevated } = useThemeToken();

  if (exp) {
    return <Navigate to={"/"} replace />;
  }

  const gradientBg = Color(colorBgElevated).alpha(0.9).toString();
  const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay2})`;

  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex"
        style={{
          background: bg,
        }}
      >
        <Flex gap={"small"} align="center">
          <Logo className="h-14 w-14" />
          <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">
          {APP_NAME}
          </div>
        </Flex>
        <img
          className="max-w-[480px] xl:max-w-[560px]"
          src={DashboardImg}
          alt=""
        />
      </div>

      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginStateProvider>
          <LoginForm />
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>
    </Layout>
  );
}
