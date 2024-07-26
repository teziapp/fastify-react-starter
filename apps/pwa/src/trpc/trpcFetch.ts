// useState is not needed for client side rendering. Needed only for SSR.
// import { useState } from "react";
import { createTRPCClient, httpBatchLink, loggerLink, splitLink, unstable_httpSubscriptionLink } from "@trpc/client";
import { ApiRouter } from "../../../api/src/router.trpc";

const url = `${import.meta.env.VITE_BE_URL}/v1`;

export const trpcFetch = createTRPCClient<ApiRouter>({
  links: [
    loggerLink(),
    // customLink,
    splitLink({
      condition(op) {
        // check for context property `skipBatch`
        return op.type === "subscription";
      },
      // when condition is true, use normal request
      true: unstable_httpSubscriptionLink({
        url,
        eventSourceOptions: {
          withCredentials: true,
        }
      }),
      // when condition is false, use batching
      false: httpBatchLink({
        fetch: (url, options) =>
          fetch(url, {
            ...options,
            credentials: "include",
          }),
        // headers: ({opList}) => ({
        //   'Authorization': `Bearer ${userObjCache.getItem()?.token}`
        // }),
        url,
      }),
    }),
    // httpLink({
    //   url,
    //   headers:({op}) => ({
    //     'Authorization': `Bearer ${userObjCache.getItem()?.token}`
    //   })
    // })
  ],
});
