import {
  FloatButton,
  Layout,
  MenuProps,
  theme,
  message,
  Button,
  Dropdown,
  Flex,
  Tooltip,
  Avatar,
} from "antd";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
// import FooterNav from "./FooterNav.tsx";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { NProgress } from "../../components/Nprogress/Progress.tsx";
import SideNav from "./SideNav.tsx";
import HeaderNav from "./HeaderNav.tsx";
import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth.ts";

const { Content } = Layout;

type AppLayoutProps = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: AppLayoutProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const { session, signOut } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(false);
  const [navFill, setNavFill] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);

  const items: MenuProps["items"] = [
    {
      key: "user-profile-link",
      label: "profile",
      icon: <UserOutlined />,
    },
    {
      key: "user-settings-link",
      label: "settings",
      icon: <SettingOutlined />,
    },
    {
      key: "user-help-link",
      label: "help center",
      icon: <QuestionOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "user-logout-link",
      label: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        signOut();
        message.open({
          type: "loading",
          content: "signing you out",
        });
      },
    },
  ];

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "none",
            boxShadow: navFill ? "0 0 8px 2px rgba(0, 0, 0, 0.05)" : "none",
            border: "none",
            transition: "all .2s",
          }}
        />
        <Layout
          style={{
            background: "none",
          }}
        >
          <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : "200px",
              padding: "0 2rem 0 0",
              background: navFill ? "rgba(255, 255, 255, .5)" : "none",
              backdropFilter: navFill ? "blur(8px)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: "all .25s",
            }}
          >
            <Flex align="center">
              <Tooltip title={`${collapsed ? "Expand" : "Collapse"} Sidebar`}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Tooltip>
            </Flex>
            <Flex align="center" gap="small">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Flex>
                  <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle",
                    }}
                    size="large"
                    gap={1}
                  >
                    {session?.user.name[0]}
                  </Avatar>
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : "200px"}`,
              borderRadius: collapsed ? 0 : borderRadius,
              transition: "all .25s",
              padding: "24px 32px",
              minHeight: 360,
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: "none" }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          {/* <FooterNav
            style={{
              textAlign: "center",
              marginLeft: collapsed ? 0 : "200px",
              background: "none",
            }}
          /> */}
        </Layout>
      </Layout>
    </>
  );
};
