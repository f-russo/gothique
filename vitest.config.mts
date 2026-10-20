import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname);

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      "@": root,
    },
  },
  test: {
    coverage: {
      // Unit-level coverage targets the pure logic layer only. DB-bound
      // modules (actions, queries, session) belong to Step 2 integration
      // tests; UI is covered by storybook + e2e.
      include: ["lib/schemas.ts", "lib/review-input.ts", "lib/utils.ts"],
    },
    projects: [
      {
        extends: true,
        test: {
          environment: "node",
          include: ["tests/**/*.test.ts"],
          // The DB tests open real (in-memory) SQLite connections.
          fileParallelism: false,
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
