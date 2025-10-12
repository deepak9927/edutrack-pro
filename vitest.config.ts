import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    css: false,
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/types": path.resolve(__dirname, "src/types"),
      "@/stores": path.resolve(__dirname, "src/stores"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/config": path.resolve(__dirname, "src/config"),
    },
  },
});
