import { QueryClient } from "@tanstack/react-query";
import {
  createTRPCReact,
  httpBatchLink,
  httpLink,
  loggerLink,
  splitLink,
} from "@trpc/react-query";
import { ApiRouter } from "../../../api/src/router.trpc";

export const trpc: ReturnType<typeof createTRPCReact<ApiRouter>> = createTRPCReact<ApiRouter>({
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
    loggerLink(),
    splitLink({
      condition(op) {
        return op.context.skipBatch === false;
      },
      true: httpLink({
        fetch: (url, options) =>
          fetch(url, {
            ...options,
            credentials: "include",
          }),
        url,
      }),
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
}) as ReturnType<typeof trpc.createClient>;
