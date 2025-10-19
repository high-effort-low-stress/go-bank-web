import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        ".next/",
        "vitest.setup.ts",
        "vitest.config.ts",
        "next-env.d.ts",
        "*.d.ts",
        "*.config.ts",
        "utils/",
        ".github",
        ".vscode",
        ".gitignore",
        "*.mjs",
        "lib/",
      ],
    },
  },
});
