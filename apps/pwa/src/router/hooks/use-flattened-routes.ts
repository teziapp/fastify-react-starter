import { useCallback, useMemo } from "react";

import { flattenMenuRoutes } from "../utils";
import { RouteObjectWithNavbar } from "..";

// Updated useFlattenedRoutes hook
export function useFlattenedRoutes(routes: RouteObjectWithNavbar[]) {
  const flattenRoutes = useCallback(flattenMenuRoutes, []);

  return useMemo(() => {
    return flattenRoutes(routes);
  }, [flattenRoutes, routes]);
}
