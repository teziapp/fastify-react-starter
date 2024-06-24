import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { AntdThemeProvider } from "tezi-antd-components";
import { router } from "./router";
import { queryClient, trpc, trpcClient } from "./trpc/trpc";

export const App = () => {
	return (
		<AntdThemeProvider>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</trpc.Provider>
		</AntdThemeProvider>
	);
};
