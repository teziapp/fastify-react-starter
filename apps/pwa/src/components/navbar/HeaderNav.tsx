import { Button, Flex, Layout, Typography } from "antd";
import { HTMLAttributes, useRef } from "react";
import { RouteObjectWithNavbar } from "../../router/router";

const { Header } = Layout;
const { Title } = Typography;

interface HeaderNavProps extends HTMLAttributes<HTMLDivElement> {
  childrenComponent?: RouteObjectWithNavbar;
}
const userData = sessionStorage.getItem("userDetails");
const AuthButton = () => {
  return userData?.length ? (
    <div className="w-full flex justify-around items-center flex-col">
      <Button
        type={"primary"}
        onClick={() => {
          sessionStorage.clear();
          window.open(import.meta.env.VITE_BE_URL + "/auth/logout", "_self");
        }}
      >
        Sign out
      </Button>
    </div>
  ) : (
    <div className="w-full flex justify-center items-center flex-col">
      <Button
        type={"primary"}
        onClick={() => {
          window.open(import.meta.env.VITE_BE_URL + "/auth/google", "_self");
        }}
      >
        Sign in
      </Button>
    </div>
  );
};

export const HeaderNav = ({ style, ...others }: HeaderNavProps) => {
  const nodeRef = useRef(null);

  style = {
    margin: 0,
    padding: "0rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 1,
    gap: 8,
    transition: "all .25s",
    background: "rgba(255, 255, 255, .5)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.1)",
    ...style,
  };

  return (
    <Header ref={nodeRef} style={style} {...others}>
      <Flex
        align="center"
        gap="small"
        justify={"space-between"}
        style={{ width: "100%" }}
      >
        <Title level={2}>Ghost of Ogilvy</Title>
        <AuthButton />
      </Flex>
    </Header>
  );
};
