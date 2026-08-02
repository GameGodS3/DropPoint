// Electron boot smoke test.
//
// Guards the Electron 21 -> 43 upgrade: verifies the app launches on the new
// runtime, spawns its shelf window, and that the preload contextBridge exposes
// `getPathForFile` — the replacement for the removed `File.path` property that
// the entire drag-in/drag-out feature depends on.
//
// Note: this launches the real Electron binary, so it needs a display. On the
// Linux CI runner it is wrapped with `xvfb-run`; macOS/Windows runners have a
// display already.

const path = require("path");
const { test, expect, _electron: electron } = require("@playwright/test");

const APP_ROOT = path.join(__dirname, "..");

/**
 * Finds the shelf window by URL. App.js creates a hidden splash BrowserWindow
 * first that never loads any content — evaluating on it (e.g. `.title()`) can
 * hang, so we match on `win.url()` (Playwright's cached URL, no in-page eval)
 * and look for the shelf's index.html.
 */
async function getShelfWindow(app, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    for (const win of app.windows()) {
      if (win.url().includes("index.html")) return win;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  const urls = app.windows().map((w) => w.url() || "(blank)").join(", ");
  throw new Error(`Shelf window (index.html) never appeared. Windows: [${urls}]`);
}

test("app boots and exposes the drag-out preload bridge", async () => {
  // --no-sandbox / --disable-gpu are required for Electron to boot reliably
  // under xvfb in CI; without them the transparent shelf window wedges the
  // GPU/sandbox process and launch never settles.
  const app = await electron.launch({
    args: [
      APP_ROOT,
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-software-rasterizer",
    ],
  });

  // Surface main-process output so any CI failure is diagnosable.
  app.process().stdout?.on("data", (d) => process.stdout.write(`[electron] ${d}`));
  app.process().stderr?.on("data", (d) => process.stdout.write(`[electron:err] ${d}`));

  try {
    const shelf = await getShelfWindow(app);
    await shelf.waitForLoadState("domcontentloaded");

    // Read title and the File.path replacement in one eval. getPathForFile
    // must be reachable from the shelf renderer, or drag-out is dead on the
    // upgraded Electron.
    const result = await shelf.evaluate(() => ({
      title: document.title,
      hasGetPathForFile: typeof window.electron?.getPathForFile === "function",
    }));
    expect(result.title).toBe("DropPoint");
    expect(result.hasGetPathForFile).toBe(true);
  } finally {
    await app.close();
  }
});
