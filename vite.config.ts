import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src/"),
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
      "@setup": path.resolve(import.meta.dirname, "./src/setup"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@features": path.resolve(import.meta.dirname, "./src/features"),
    },
  },
});
