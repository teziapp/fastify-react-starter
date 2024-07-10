import { NavbarFields, RouteObjectWithNavbar } from ".";

// Helper function to check if a route should be included in the flattened list
const shouldIncludeInFlattenedList = (
  route: RouteObjectWithNavbar
): boolean => {
  return route.showInNav === true;
};

// Updated flattenMenuRoutes function
export function flattenMenuRoutes(
  routes: RouteObjectWithNavbar[]
): NavbarFields[] {
  return routes.reduce<NavbarFields[]>((prev, item) => {
    if (shouldIncludeInFlattenedList(item)) {
      const { navLabel, navPath, icon, title, children, ...rest } = item;
      const flatItem: NavbarFields & {
        children?: RouteObjectWithNavbar[];
      } = {
        navLabel,
        navPath,
        icon,
        title,
        ...rest,
      };

      prev.push(flatItem);

      if (children) {
        if (!navLabel && !icon) {
          // If parent doesn't have navLabel or icon, add children directly
          prev.push(...flattenMenuRoutes(children));
        } else {
          // If parent has navLabel or icon, add children as nested
          flatItem.children = flattenMenuRoutes(children);
        }
      }
    } else if (item.children) {
      // If the item shouldn't be included but has children, process the children
      prev.push(...flattenMenuRoutes(item.children));
    }

    return prev;
  }, []);
}
