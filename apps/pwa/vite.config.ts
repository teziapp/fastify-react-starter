import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_BE_URL": JSON.stringify(env.VITE_BE_URL),
    },
    plugins: [
      react(),
      svgr(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: [
            "**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,otf,mp4,webm,wav,mp3,m4a,aac,oga}",
          ],
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
          sourcemap: true,
        },
        includeAssets: [
          "favicon.ico",
          "favicon/apple-touch-icon.png",
          "favicon/favicon-32x32.png",
        ],
        manifest: {
          short_name: "My App",
          name: "My App",
          description: "Good Description",
          icons: [
            {
              src: "favicon.ico",
              sizes: "64x64 32x32 24x24 16x16",
              type: "image/x-icon",
            },
            {
              src: "favicon/android-chrome-192x192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "favicon/android-chrome-512x512.png",
              type: "image/png",
              sizes: "512x512",
            },
          ],
          start_url: ".",
          display: "standalone",
          theme_color: "#5296d9",
          background_color: "#ffffff",
        },
      }),
    ],
  };
});
