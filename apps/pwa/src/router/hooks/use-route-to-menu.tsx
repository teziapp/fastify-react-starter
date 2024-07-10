// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useCallback } from "react";
import { RouteObjectWithNavbar } from "..";
import { ThemeLayout } from "../../types/enum";
import { useSettings } from "../../store/settingStore";
import { Iconify, SvgIcon } from "../../components/icon";

export function useRouteToMenuFn() {
  const { themeLayout } = useSettings();

  const routeToMenuFn = useCallback(
    (items: RouteObjectWithNavbar[]): ItemType[] => {
      return items
        .filter((item) => item.showInNav)
        .flatMap((item): ItemType | ItemType[] => {
          const { navLabel, navPath, icon, title, children } = item;

          if (!icon && !navLabel && children) {
            return routeToMenuFn(children);
          }

          const menuItem: ItemType = {};

          if (navPath) menuItem.key = navPath;
          if (title) menuItem.title = title;

          if (navLabel) {
            menuItem.label = (
              <div
                className={`inline-flex w-full items-center ${
                  themeLayout === ThemeLayout.Horizontal
                    ? "justify-start"
                    : "justify-between"
                }`}
              >
                {navLabel}
              </div>
            );
          }

          if (icon) {
            if (typeof icon === "string") {
              if (icon.startsWith("ic")) {
                menuItem.icon = (
                  <SvgIcon
                    icon={icon}
                    size={24}
                    className="ant-menu-item-icon"
                  />
                );
              } else {
                menuItem.icon = (
                  <Iconify
                    icon={icon}
                    size={24}
                    className="ant-menu-item-icon"
                  />
                );
              }
            } else {
              menuItem.icon = icon;
            }
          }

          if (children) {
            const childMenuItems = routeToMenuFn(children);
            if (childMenuItems.length > 0) {
              menuItem.children = childMenuItems;
            }
          }

          // Apply styles only to selected items
          menuItem.className = ({ selected }: { selected: boolean }) =>
            selected ? "text-black [&_.ant-menu-item-icon]:text-black" : "";

          return menuItem;
        });
    },
    [themeLayout]
  );

  return routeToMenuFn;
}
