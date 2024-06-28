import React, { useEffect, useRef, useState } from "react";
import {
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Menu,
  MenuProps,
  SiderProps,
  Typography,
} from "antd";
import { useLocation } from "react-router-dom";
import { Logo } from "../../components/Logo/Logo";
import { PieChartOutlined } from "@ant-design/icons";
import { appVersion } from "../../config";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps["items"] = [
  getItem("Dashboards", "dashboards", <PieChartOutlined />),
];

const rootSubmenuKeys = ["dashboards", "corporate", "user-profile"];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Flex vertical align="center">
        <Logo
          color="black"
          asLink
          href={"/"}
          justify="center"
          gap="small"
          imgSize={{ h: 28, w: 28 }}
          style={{ padding: "1rem 0" }}
        />
        <Typography.Text disabled>v. {appVersion} </Typography.Text>
      </Flex>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: "#ffe8b3",
              itemHoverBg: "#fff7e6",
              itemSelectedColor: "#cc8400",
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: "none" }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
