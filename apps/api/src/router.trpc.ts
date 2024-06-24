import { inferRouterOutputs } from "@trpc/server";
// import * as packageJson from "../package.json";
import { publicProcedure, router, protectedProcedure } from "./context.trpc";

export const trpcRouter = router({
  user: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    return user;
  }),
  version: publicProcedure.query(() => ({
    // beVersion: packageJson.version,
    // forceLogoutBelowFrontendVersion:
    // packageJson.force_logout_below_frontend_version,
    // forceUpdateBelowFrontendVersion:
    // packageJson.force_update_below_frontend_version,
  })),
});

// export type definition of API
export type ApiRouter = typeof trpcRouter;
export type RouterOutputs = inferRouterOutputs<ApiRouter>;
