import path from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import reactSWC from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn:Partial<VitePWAOptions> = {
  devOptions: {
    enabled: true,
    type: "module",
    navigateFallback: "index.html",
  },
  registerType: 'prompt',
  workbox: {
    globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg,ts,tsx}"],
    runtimeCaching: [
      {
        urlPattern: ({ request }: { request: Request }) => request.destination === "image",
        handler: "StaleWhileRevalidate",
      },
      {
        urlPattern: /\.(?:woff|woff2)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts',
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /\.(?:png|gif|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
          }
        }
      }
    ],
  },
  manifest: {
    short_name: "Boilerplate",
    name: "Boilerplate",
    description: "React-fastify boilerplate",
    icons: [
      {
        src: "favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    start_url: "/",
    display: "standalone",
    theme_color: "#5296d9",
    orientation: "any",
    categories: ["business", "productivity", "content", "curation"],
    background_color: "#ffffff",
    // This is useless code, When user share some doc, it'll show our app there. It will bring users attention to our existence. Cheers!
    "share_target": {
      "action": "/share-target/",
      "method": "POST",
      "enctype": "multipart/form-data",
      "params": {
        "title": "title",
        "text": "text",
        "url": "url",
        "files": [
          {
            "name": "images",
            "accept": ["image/*"]
          }
        ]
      }
    }
  }
};

const replaceOptions = {
  __DATE__: new Date().toISOString(),
  preventAssignment: true,
};

const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

export default defineConfig({

  base: "/",
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    reactSWC(),
    VitePWA(manifestForPlugIn),
    // replace(replaceOptions),
    tsconfigPaths(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  worker: {
    plugins: () => [reactSWC()],
    format: "es",
  },

  build: {
    target: "esnext",
    minify: "esbuild",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});