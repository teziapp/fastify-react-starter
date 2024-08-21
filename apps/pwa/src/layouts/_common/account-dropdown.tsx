import { Divider, MenuProps } from "antd";
import Dropdown, { DropdownProps } from "antd/es/dropdown/dropdown";
import React from "react";
import { NavLink } from "react-router-dom";

import { useThemeToken } from "../../theme/hooks";
import { useUserActions, useUserInfo } from "../../store/userStore";
import { IconButton } from "../../components/icon";
import { useLoginStateContext } from "../../pages/sys/login/providers/LoginStateProvider";
import { trpc } from "@/trpc/trpc";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
  const { name, email, profilePicture } = useUserInfo();
  const { clearUserInfoAndToken } = useUserActions();
  const { backToLogin } = useLoginStateContext();
	const utils = trpc.useUtils();

  const logout = trpc.auth.logout.useMutation({
		onSuccess() {
			utils.auth.profile.reset()
      clearUserInfoAndToken();
      backToLogin();
		},
	})
  
  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } =
    useThemeToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  const dropdownRender: DropdownProps["dropdownRender"] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{name}</div>
        <div className="text-gray">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps["items"] = [
    {
      label: <NavLink to={HOMEPAGE}>{"Dashboard"}</NavLink>,
      key: "0",
    },
    {
      label: <NavLink to="/management/user/profile">{"Profile"}</NavLink>,
      key: "1",
    },
    {
      label: <NavLink to="/management/user/account">{"Account"}</NavLink>,
      key: "2",
    },
    { type: "divider" },
    {
      label: <button className="font-bold text-warning">{"Logout"}</button>,
      key: "3",
      onClick: () => {
        logout.mutate()
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      dropdownRender={dropdownRender}
    >
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img
          className="h-8 w-8 rounded-full"
          src={profilePicture}
          alt=""
          referrerPolicy="no-referrer"
        />
      </IconButton>
    </Dropdown>
  );
}
