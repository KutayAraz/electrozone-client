import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

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
  test: {
    environment: "jsdom",
    // e2e/ holds the Playwright tests, which Vitest can't run
    include: ["src/**/*.test.{ts,tsx}"],
    // Lets Testing Library register its automatic DOM cleanup after each test.
    globals: true,
    setupFiles: "./src/testing/setup-tests.ts",
  },
});
