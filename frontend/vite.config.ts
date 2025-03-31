import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  build: { minify: "esbuild" },
  resolve: {
    alias: {
      "#front": path.resolve(import.meta.dirname, "./src"),
    },
  },
  plugins: [solid()],
});
