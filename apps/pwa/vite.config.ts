import path from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// use without react-swc use react only
import reactSWC from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  devOptions: {
    enabled: true,
    type: "module",
    navigateFallback: "index.html",
  },
  registerType: 'prompt',
  workbox: {
    globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg,ts,tsx}"],
    maximumFileSizeToCacheInBytes: 10000000,
    // Enable sourcemaps for the service worker. This allows for easier debugging of the service worker code. by mapping the compiled code back to the original source
    sourcemap: true,
    runtimeCaching: [
      {
        urlPattern: ({ request }: { request: Request }) => 
          request.destination === "image" || 
          /\.(?:png|gif|jpg|jpeg|svg)$/.test(request.url),
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
          }
        }
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
      }      
    ],
  },
  includeAssets: [
    "/favicon.ico",
    "/favicon/apple-touch-icon.png",
    "/favicon/favicon-32x32.png",
    "/favicon/favicon-16x16.png",
    "/favicon/android-chrome-192x192.png",
    "/favicon/android-chrome-512x512.png",
    "/screenshots/screenshot-1.png",
    "/screenshots/screenshot-2.png",
    "/screenshots/screenshot-3.png",
    "/screenshots/screenshot-4.png",
    "/screenshots/screenshot-5.png",
    "/screenshots/screenshot-6.png",
    "/screenshots/screenshot-7.jpeg",
    "/screenshots/screenshot-8.jpeg",
    "/screenshots/screenshot-9.jpeg",
    "/screenshots/screenshot-10.jpeg",
    "masked-icon.svg"
  ],
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
    start_url: '/',
    lang: 'en',
    dir: 'ltr',
    scope: '/',
    display: "standalone",
    theme_color: "#5296d9",
    orientation: "any",
    screenshots: [
      {
        src: "/screenshots/screenshot-1.png",
        type: "image/png",
        sizes: "1280x720",
        form_factor: "wide",
        platform: "windows",
      },
      {
        src: "/screenshots/screenshot-2.png",
        type: "image/png",
        sizes: "1280x720",
        form_factor: "wide",
        platform: "windows",
      },
      {
        src: "/screenshots/screenshot-3.png",
        type: "image/png",
        sizes: "1280x720",
        platform: "windows",
      },
      {
        src: "/screenshots/screenshot-4.png",
        type: "image/png",
        sizes: "1280x720",
        platform: "windows",
      },
      {
        src: "/screenshots/screenshot-4.png",
        type: "image/png",
        sizes: "1280x720",
        platform: "windows",
      },
      {
        src: "/screenshots/screenshot-5.png",
        type: "image/png",
        sizes: "1280x720",
        platform: "windows",
      },
      {
        src: "/screenshots/screenshot-6.png",
        type: "image/png",
        sizes: "1280x720",
        platform: "windows",
      },
      {
        src: "/screenshots/screenshot-7.jpeg",
        type: "image/jpeg",
        sizes: "1080x2400",
        platform: "android",
      },
      {
        src: "/screenshots/screenshot-8.jpeg",
        type: "image/jpeg",
        sizes: "1080x2400",
        platform: "android",
      },
      {
        src: "/screenshots/screenshot-9.jpeg",
        type: "image/jpeg",
        sizes: "1080x2400",
        platform: "android",
      },
      {
        src: "/screenshots/screenshot-10.jpeg",
        type: "image/jpeg",
        sizes: "1080x2400",
        platform: "android",
      },
    ],	
    categories: ["business", "productivity", "boilerplate"],
    background_color: "#ffffff",
    share_target: {
      action: "/share-target/",
      method: "POST",
      enctype: "multipart/form-data",
      params: {
        title: "title",
        text: "text",
        url: "url",
        files: [
          {
            name: "images",
            accept: ["image/*"]
          }
        ]
      }
    },
    shortcuts: [
      {
        name: "New voucher",
        description: "Create a new voucher",
        url: "/voucher/add-new",
        icons: [
          {
            src: "/icons/ic_cart.svg",			
          }
        ],						
      },
      {
        name: "Outstanding List",
        description: "Create a new order",
        url: "/order/add-new",
        icons: [
          {
            src: "/icons/ic_cart.svg",			
          }
        ],						
      }
    ],
  },
  strategies: 'injectManifest',  // Use injectManifest strategy
  srcDir: 'src',  // Point to the source directory
  filename: 'sw.ts',  // Custom service worker filename
};

export default defineConfig({
  base: "/",
  esbuild: {},
  css: {
    devSourcemap: true,
  },
  plugins: [
    reactSWC(),
    VitePWA(manifestForPlugIn),
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
  }
});
