import ReactDOM from "react-dom/client";
import { App } from "./App";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient, trpc, trpcClient } from "./trpc/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
// eslint-disable-next-line import/no-unresolved
import "virtual:svg-icons-register";
// tailwind css
import "./theme/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense>
          <App />
        </Suspense>
      </QueryClientProvider>
    </trpc.Provider>
  </HelmetProvider>,
);
