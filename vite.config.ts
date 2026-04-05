import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@fintrack/components": path.resolve(__dirname, "src/components"),
      "@fintrack/pages": path.resolve(__dirname, "src/pages"),
      "@fintrack/store": path.resolve(__dirname, "src/store"),
      "@fintrack/hooks": path.resolve(__dirname, "src/hooks"),
      "@fintrack/types": path.resolve(__dirname, "src/types"),
      "@fintrack/utils": path.resolve(__dirname, "src/utils"),
      "@fintrack/data": path.resolve(__dirname, "src/data"),
      "@fintrack/routes": path.resolve(__dirname, "src/routes"),
      "@fintrack/constants": path.resolve(__dirname, "src/constants"),
      "@fintrack/api": path.resolve(__dirname, "src/api"),
      "@fintrack/assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
