import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";
import { BRAND_COLORS, COLOR } from "./colors";

const theme: ThemeConfig = {
  token: {
    colorPrimary: COLOR[500],
    colorInfo: COLOR[500],
    colorSuccess: "#52c41a",
    colorWarning: BRAND_COLORS.yellow,
    colorError: BRAND_COLORS.red,
    colorTextBase: "#333",
    borderRadius: 8,
    fontFamily:
      'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Breadcrumb: {
      itemColor: "rgba(0,0,0,0.65)",
      linkColor: COLOR[700],
      separatorColor: "rgba(0,0,0,0.45)",
    },
    Button: {
      colorPrimary: COLOR[500],
      colorPrimaryHover: COLOR[400],
      colorPrimaryActive: COLOR[600],
      colorLink: COLOR[500],
      colorLinkHover: COLOR[400],
      colorLinkActive: COLOR[600],
    },
    Card: {
      colorBorderSecondary: COLOR.borderColor,
    },
    Carousel: {
      colorBgContainer: BRAND_COLORS.red,
      dotWidth: 10,
      dotHeight: 10,
      dotActiveWidth: 24,
    },
    Menu: {
      itemSelectedColor: COLOR[100],
      itemSelectedColor: COLOR[700],
    },
    Segmented: {
      colorBgLayout: COLOR[100],
      colorText: COLOR[700],
    },
    Table: {
      colorBorderSecondary: COLOR[200],
      rowHoverBg: COLOR[50],
    },
    Tabs: {
      colorBorderSecondary: COLOR[200],
      inkBarColor: COLOR[500],
    },
    Typography: {
      colorLink: COLOR[500],
      colorLinkHover: COLOR[400],
      colorLinkActive: COLOR[600],
    },
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
