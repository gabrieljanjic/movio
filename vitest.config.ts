import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic", // ⬅️
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "__tests__/setup.tsx",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
