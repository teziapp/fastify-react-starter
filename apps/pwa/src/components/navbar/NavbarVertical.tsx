import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Typography, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { isSidebarOpenState } from "../../../utils/recoil_state";

const { Sider } = Layout;
const { Text } = Typography;

const NavbarVertical: React.FC = () => {
  const navConfig = navRouteConfig[0].children;
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();

  const isDesktop = useResponsive("up", "lg");

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  const onCloseSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    if (isSidebarOpen) {
      onCloseSidebar();
    }
  }, [pathname]);

  const siderWidth = isCollapse
    ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
    : NAVBAR.DASHBOARD_WIDTH;

  return (
    <Sider
      width={siderWidth}
      collapsible
      collapsed={isCollapse}
      onCollapse={onToggleCollapse}
      trigger={null}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space align="center" style={{ padding: "16px" }}>
          <Logo />
          {!isCollapse && <Text>v.{appVersion}</Text>}
          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )}
        </Space>

        <NavbarAccount isCollapse={isCollapse} />

        <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />

        <div style={{ flex: 1 }} />

        <Space
          direction="vertical"
          align="center"
          style={{ width: "100%", padding: "16px" }}
        >
          <DocIllustration />
          <Button
            icon={<LogoutOutlined />}
            onClick={logout}
            danger
            type="primary"
          >
            Logout
          </Button>
        </Space>
      </Space>
    </Sider>
  );
};

export default NavbarVertical;
