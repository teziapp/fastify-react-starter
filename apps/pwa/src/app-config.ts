import { PATH_DASHBOARD } from "@/routes/paths";
import { version } from "../package.json";

// / App Configuration
export const APP_NAME = "Your App Name";
export const APP_DESCRIPTION = "Your app description goes here.";

// Image Paths
export const APP_LOGO = "/favicon/apple-touch-icon.png";
export const APP_FAVICON = "/favicon.ico";

// Meta Tags
export const META_TITLE = "Your App Title";
export const META_DESCRIPTION = "Your app content description.";

// Social Media
export const SOCIAL_TWITTER = "https://twitter.com/youraccount";
export const SOCIAL_FACEBOOK = "https://facebook.com/youraccount";

// External Links
export const COMPANY_URL = "https://yourcompany.com";
export const SUPPORT_EMAIL = "support@yourcompany.com";

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_BE_URL || "http://localhost:4000";

// microsoft clarity
export const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || "Your-Clarity-ID";


const currentURL = window.location.href;
export const isRemote = currentURL.slice(0, 8) === "https://";
export const be_url = isRemote
  ? import.meta.env.VITE_BE_URL
  : "http://localhost:4000";

export const appVersion = version;

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.one;