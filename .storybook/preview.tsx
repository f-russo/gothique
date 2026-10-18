import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import {
  AppRouterContext,
  GlobalLayoutRouterContext,
  LayoutRouterContext,
} from 'next/dist/shared/lib/app-router-context.shared-runtime.js';
import {
  PathParamsContext,
  PathnameContext,
  SearchParamsContext,
} from 'next/dist/shared/lib/hooks-client-context.shared-runtime.js';

import '../app/globals.css';

/**
 * Minimal App Router provider for stories.
 *
 * We don't use the framework's built-in `parameters.nextjs.appDirectory`
 * provider because Next 16.4's internal `useRouter` reads
 * `LayoutRouterContext.parentRenderTree.data.bfcacheId`, which the provider
 * doesn't supply yet (it crashes inside Link's RedirectBoundary). This
 * decorator mounts the same contexts directly, including the missing field.
 *
 * Components importing `next/navigation` still get the framework's mocked
 * hooks; only Next's internal router reads these contexts.
 */
const noop = () => {};
const mockRouter = {
  push: noop,
  replace: noop,
  back: noop,
  forward: noop,
  prefetch: noop,
  refresh: noop,
  hmrRefresh: noop,
};

const appRouter = (Story) => {
  const tree = ['/', { children: [] }];
  const cacheNode = {
    lazyData: null,
    rsc: null,
    prefetchRsc: null,
    head: null,
    prefetchHead: null,
    parallelRoutes: new Map(),
    loading: null,
  };
  return (
    <PathnameContext.Provider value="/">
      <PathParamsContext.Provider value={{}}>
        <SearchParamsContext.Provider value={new URLSearchParams()}>
          <GlobalLayoutRouterContext.Provider
            value={{
              changeByServerResponse: noop,
              buildId: 'storybook',
              tree,
              focusAndScrollRef: {
                apply: false,
                hashFragment: null,
                segmentPaths: [tree],
                onlyHashChange: false,
              },
              nextUrl: '/',
            }}
          >
            <AppRouterContext.Provider value={mockRouter}>
              <LayoutRouterContext.Provider
                value={{
                  childNodes: new Map(),
                  tree,
                  parentTree: tree,
                  parentCacheNode: cacheNode,
                  parentRenderTree: { data: {} },
                  url: '/',
                  loading: null,
                }}
              >
                <Story />
              </LayoutRouterContext.Provider>
            </AppRouterContext.Provider>
          </GlobalLayoutRouterContext.Provider>
        </SearchParamsContext.Provider>
      </PathParamsContext.Provider>
    </PathnameContext.Provider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Centered canvas so component snapshots have stable, tight bounds.
    layout: 'centered',
    backgrounds: {
      options: {
        dark: { value: '#0a0a0f' },
        light: { value: '#fafafa' },
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
    appRouter,
  ],
};

export default preview;
