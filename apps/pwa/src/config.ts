import { version } from "../package.json";

const currentURL = window.location.href;
export const isRemote = currentURL.slice(0, 8) === "https://";
export const be_url = isRemote
  ? import.meta.env.VITE_BE_URL
  : "http://localhost:4000";

// LAYOUT
// ----------------------------------------------------------------------

export const appVersion = version;

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const collapseDrawer = {
  BASE_WIDTH: 260,
  DRAWER_WIDTH: 300,
  DRAWER_COLLAPSE_WIDTH: 0,
  DRAWER_ITEM_ROOT_HEIGHT: 48,
  DRAWER_ITEM_SUB_HEIGHT: 40,
  DRAWER_ITEM_HORIZONTAL_HEIGHT: 40,
};
