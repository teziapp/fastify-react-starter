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

