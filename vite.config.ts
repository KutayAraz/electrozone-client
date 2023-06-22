import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@setup": path.resolve(__dirname, "./src/setup"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@Product": path.resolve(__dirname, "./src/pages/Product"),
    },
  },
});
