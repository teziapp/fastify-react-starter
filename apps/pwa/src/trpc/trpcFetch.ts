// useState is not needed for client side rendering. Needed only for SSR.
// import { useState } from "react";
import { createTRPCProxyClient, httpBatchLink, splitLink } from "@trpc/client";
import { httpLink } from "@trpc/client/links/httpLink";
import { ApiRouter } from "../../../api/src/router.trpc";

const url = `${import.meta.env.VITE_BE_URL}/v1`;

export const trpcFetch = createTRPCProxyClient<ApiRouter>({
  links: [
    // customLink,
    splitLink({
      condition(op) {
        // check for context property `skipBatch`
        return op.context.skipBatch === true;
      },
      // when condition is true, use normal request
      true: httpLink({
        fetch: (url, options) =>
          fetch(url, {
            ...options,
            credentials: "include",
          }),
        url,
        // headers:({op}) => ({
        //   'Authorization': `Bearer ${userObjCache.getItem()?.token}`
        // })
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
