import { matchPath } from "react-router-dom";

// ----------------------------------------------------------------------

export { default } from "./NavSectionVertical";

export function isExternalLink(path: string) {
  return path.includes("http");
}

export function getActive(path: string, pathname: string) {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}
