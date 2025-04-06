import path from "node:path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  build: { minify: "esbuild" },
  base: "/app",
  resolve: {
    alias: {
      "#front": path.resolve(import.meta.dirname, "./src"),
      "#back": path.resolve(import.meta.dirname, "../backend/src"),
    },
  },
  plugins: [
    TanStackRouterVite({ target: "solid", autoCodeSplitting: true }),
    tailwindcss(),
    solid(),
  ],
});
