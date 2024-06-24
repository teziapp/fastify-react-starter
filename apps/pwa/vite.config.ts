import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		define: {
			VITE_BE_URL: JSON.stringify(env.VITE_BE_URL),
			process: { env: {} },
		},
		plugins: [react()],
	};
});
