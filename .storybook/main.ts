import type { StorybookConfig } from '@storybook/nextjs-vite';
import tailwindcss from '@tailwindcss/vite';
import type { ViteDevServer } from 'vite';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    // Re-optimize deps on every start. Without this, Vite can serve stale
    // pre-bundled deps (504 Outdated Optimize Dep) after node_modules changes,
    // which makes stories fail to import with a confusing error page.
    config.optimizeDeps = { ...config.optimizeDeps, force: true };
    // Next compiles Tailwind via Turbopack; Storybook uses Vite, so we need
    // the Tailwind Vite plugin for app/globals.css to actually generate
    // utilities from our components.
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    // Components import server actions from "@/lib/actions", which transitively
    // pulls in better-sqlite3 (native, server-only). Point that import at a
    // browser-safe stub so stories can render interaction-heavy components.
    config.resolve ??= {};
    config.resolve.alias = [
      ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
      {
        find: /^@\/lib\/actions$/,
        replacement: new URL('./actions-stub.ts', import.meta.url).pathname,
      },
    ];
    return config;
  },
};

export default config;
