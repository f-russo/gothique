/**
 * Self-hosted visual regression tests for Storybook stories.
 *
 * Usage:
 *   pnpm run storybook &            # or let the script spawn it (default)
 *   node scripts/visual-test.mjs              # compare against baselines
 *   node scripts/visual-test.mjs --update     # (re)record baselines
 *   node scripts/visual-test.mjs --filter star-rating   # subset by story id
 *
 * Anti-flake conventions baked in:
 *   - Fixed viewport + deviceScaleFactor 1 (no DPR noise)
 *   - All CSS animations/transitions frozen at their end state
 *   - Caret hidden, fonts awaited via document.fonts.ready
 *   - Network-idle wait before capture (images settled)
 *   - Deterministic stories only: no dates, randomness, or remote images
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, existsSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SHOTS_DIR = join(ROOT, "test", "visual", "__screenshots__");
const PORT = 6006;
const BASE = `http://localhost:${PORT}`;

const UPDATE = process.argv.includes("--update");
const FILTER_IDX = process.argv.indexOf("--filter");
const FILTER = FILTER_IDX > -1 ? process.argv[FILTER_IDX + 1] : null;

const VIEWPORT = { width: 1280, height: 800 };
const MAX_DIFF_PIXELS = 64; // tolerance for anti-aliasing noise
const DIFF_THRESHOLD = 0.2;

// Freeze every animation/transition at its final state, hide the caret.
const FREEZE_CSS = `
  *, *::before, *::after {
    animation-play-state: paused !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition: none !important;
    caret-color: transparent !important;
  }
  html { scroll-behavior: auto !important; }
`;

const log = (m) => console.log("  • " + m);
const fail = (m) => console.error("  ✗ " + m);

async function waitForServer(url, timeoutMs = 90_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        // Wait until the story index is actually populated, not just served.
        const res = await fetch(`${url}/index.json`);
        if (res.ok) {
          const index = await res.json();
          if (Object.keys(index.entries ?? {}).length > 0) return resolve();
        }
      } catch {}
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Storybook did not start at ${url}`));
      }
      setTimeout(tick, 500);
    };
    tick();
  });
}

async function startStorybook() {
  log("Starting Storybook…");
  const proc = spawn(
    "pnpm",
    ["exec", "storybook", "dev", "--ci", "--port", String(PORT), "--no-open"],
    { cwd: ROOT, stdio: "ignore", shell: true },
  );
  await waitForServer(BASE);
  return proc;
}

async function listStories() {
  const res = await fetch(`${BASE}/index.json`);
  const text = await res.text();
  const index = JSON.parse(text);
  const all = Object.entries(index.entries ?? {});
  return all
    .filter(([id, entry]) => entry.type === "story" && !entry.parameters?.visualTest?.skip)
    .map(([id, entry]) => ({ id, title: entry.title, name: entry.name }));
}

async function main() {
  mkdirSync(SHOTS_DIR, { recursive: true });
  const proc = await startStorybook();
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const stories = await listStories();
  const filtered = FILTER
    ? stories.filter((s) => s.id.toLowerCase().includes(FILTER.toLowerCase()))
    : stories;
  log(`Found ${stories.length} stories${FILTER ? `, testing ${filtered.length}` : ""}.`);

  let passed = 0;
  const failures = [];
  const updated = [];

  try {
    for (const story of filtered) {
      const file = `${story.id.replace(/[^a-z0-9-]+/gi, "-")}.png`;
      const path = join(SHOTS_DIR, file);

      await page.goto(`${BASE}/iframe.html?id=${story.id}&viewMode=story`, {
        waitUntil: "networkidle",
      });
      await page.addStyleTag({ content: FREEZE_CSS });
      await page.evaluate(() => document.fonts.ready);
      // Let the frozen animations settle on their final frame.
      await page.waitForTimeout(150);

      // Guard against Storybook error pages (e.g. failed module imports):
      // they render deterministically, so a broken story would otherwise
      // produce a "passing" baseline of the error UI itself.
      const isErrorPage = await page.evaluate(() => {
        const root = document.getElementById("storybook-root");
        const bodyText = document.body.innerText || "";
        return (
          bodyText.includes("Failed to fetch dynamically imported module") ||
          bodyText.includes("The component failed to render properly") ||
          !root ||
          root.children.length === 0
        );
      });
      if (isErrorPage) {
        // One retry: a cold Vite transform can transiently fail on first hit.
        await page.reload({ waitUntil: "networkidle" });
        await page.addStyleTag({ content: FREEZE_CSS });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(150);
        const retry = await page.evaluate(() => {
          const root = document.getElementById("storybook-root");
          return (
            (document.body.innerText || "").includes(
              "Failed to fetch dynamically imported module",
            ) || !root ||
            root.children.length === 0
          );
        });
        if (retry) {
          fail(`${story.id}: story failed to render (import/render error)`);
          failures.push(file);
          continue;
        }
      }

      const shot = PNG.sync.read(await page.screenshot({ fullPage: true }));

      if (UPDATE || !existsSync(path)) {
        writeFileSync(path, PNG.sync.write(shot));
        updated.push(file);
        log(`${UPDATE ? "recorded" : "new baseline"}: ${file}`);
        continue;
      }

      const baseline = PNG.sync.read(readFileSync(path));
      if (baseline.width !== shot.width || baseline.height !== shot.height) {
        fail(`${file}: size changed (${baseline.width}x${baseline.height} → ${shot.width}x${shot.height})`);
        failures.push(file);
        writeFileSync(path.replace(".png", ".diff.png"), PNG.sync.write(shot));
        continue;
      }

      const diff = new PNG({ width: shot.width, height: shot.height });
      const diffPixels = pixelmatch(
        baseline.data,
        shot.data,
        diff.data,
        shot.width,
        shot.height,
        { threshold: DIFF_THRESHOLD },
      );
      writeFileSync(path.replace(".png", ".diff.png"), PNG.sync.write(diff));

      if (diffPixels > MAX_DIFF_PIXELS) {
        fail(`${file}: ${diffPixels} pixels differ (>${MAX_DIFF_PIXELS}) — see .diff.png`);
        failures.push(file);
      } else {
        passed++;
        // Clean up stale diff images for passing stories.
        existsSync(path.replace(".png", ".diff.png")) &&
          rmSync(path.replace(".png", ".diff.png"));
      }
    }
  } finally {
    await browser.close();
    proc.kill();
  }

  console.log(
    `\n${passed} passed, ${failures.length} failed, ${updated.length} ${UPDATE ? "updated" : "recorded"}.`,
  );
  if (failures.length > 0) process.exit(1);
}

main().catch((e) => {
  fail(e.stack ?? e.message);
  process.exit(1);
});
