import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function resolve(dir: string) {
  return path.join(__dirname, "/", dir);
}

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react()],
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
