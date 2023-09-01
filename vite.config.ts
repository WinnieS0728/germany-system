import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

function resolve(dir: string) {
  return path.join(__dirname, "/", dir);
}

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        includeAssets: "**/*.{png}",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        },
        manifest: {
          name: "pwa app create form vite",
          short_name: "vite APP",
          description: "a pwa app create form vite_pwa",
          display: "standalone",
          theme_color: "#ffffff",
          start_url: "/",
          icons: [
            {
              src: "./pwa/192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "./pwa/512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "./pwa/512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "./pwa/512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
    base: "./",
    resolve: {
      alias: {
        "@": resolve("src"),
        "@styles": resolve("src/assets/styles"),
        "@locales": resolve("src/assets/locales"),
        "@pages": resolve("src/pages"),
        "@components": resolve("src/components"),
        "@data": resolve("src/data"),
        "@reducers": resolve("src/data/reducers"),
        "@actions": resolve("src/data/actions"),
        "@api": resolve("src/lib/api"),
        "@hooks": resolve("src/hooks"),
        "@layouts": resolve("src/layouts"),
        "@buttons": resolve("src/components/UI/buttons"),
        "@img": resolve("src/assets/images"),
        "@localData": resolve("public/data"),
        types: resolve("src/types"),
      },
    },
  });
};
