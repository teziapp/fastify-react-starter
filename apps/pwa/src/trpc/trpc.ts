import { QueryClient } from "@tanstack/react-query";
import {
  createTRPCReact,
  httpBatchLink,
  httpLink,
  loggerLink,
  splitLink,
  unstable_httpBatchStreamLink,
} from "@trpc/react-query";
import { ApiRouter, RouterOutputs } from "../../../api/src/router.trpc";

export const trpc:any = createTRPCReact<ApiRouter>({
  abortOnUnmount: true,
});

const url = `${import.meta.env.VITE_BE_URL}/v1`;

// queryClient & trpc Client are placed inside a state hook in case of SSR.
export const queryClient = new QueryClient({
  // queryCache: new QueryCache({
  //   onError: (error) => {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //       if (error.message.includes("Unauthorized User")) {
  //         window.location.href = "/login";
  //       }
  //     }
  //   },
  // }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export const trpcClient = trpc.createClient({
  links: [
    unstable_httpBatchStreamLink({
      fetch: (url, options) =>
        fetch(url, {
          ...options,
          credentials: "include",
        }),
      url,
    }),
    loggerLink(),
    // customLink,
    splitLink({
      condition(op) {
        // check for context property `skipBatch`
        return op.context.skipBatch === false;
      },
      // when condition is true, use normal request
      true: httpLink({
        fetch: (url, options) =>
          fetch(url, {
            ...options,
            credentials: "include",
          }),
        url,
      }),
      // when condition is false, use batching
      false: httpBatchLink({
        fetch: (url, options) =>
          fetch(url, {
            ...options,
            credentials: "include",
          }),
        url,
      }),
    }),
  ],
});

export type UserType = RouterOutputs["auth"]["profile"];
export type ApiRouterOutputs = RouterOutputs;
