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
 * Finds the shelf window by title, skipping the hidden splash BrowserWindow
 * that App.js creates first (it loads no content and has no title).
 */
async function getShelfWindow(app, timeoutMs = 20_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    for (const win of app.windows()) {
      try {
        if ((await win.title()) === "DropPoint") return win;
      } catch {
        // Window may still be initializing; ignore and retry.
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Shelf window (title "DropPoint") never appeared');
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
    await expect(shelf).toHaveTitle("DropPoint");

    // The File.path replacement must be reachable from the shelf renderer,
    // or drag-out is dead on the upgraded Electron.
    const hasGetPathForFile = await shelf.evaluate(
      () => typeof window.electron?.getPathForFile === "function"
    );
    expect(hasGetPathForFile).toBe(true);
  } finally {
    await app.close();
  }
});
