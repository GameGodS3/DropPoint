// Electron upgrade smoke tests.
//
// Guards the Electron 21 -> 43 upgrade. Two cheap, reliable checks:
//   1. The app actually launches on the new Electron runtime and gets as far
//      as creating its shelf window, without the main process crashing.
//   2. The `File.path` -> `webUtils.getPathForFile` fix (the removed API that
//      the whole drag-in/out feature depends on) stays wired up.
//
// Why process-level instead of Playwright's `_electron` CDP driver: DropPoint's
// shelf is a transparent, always-on-top, all-workspaces window. Driving it over
// CDP under a bare xvfb X server (no window manager) wedges — even app.close()
// hangs — so we launch the app as a child process and wait for its own
// "Instance ID" ready-log on stdout, then hard-kill it. On Linux CI this runs
// under xvfb-run; macOS/Windows runners have a display already.

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { test, expect } = require("@playwright/test");

const APP_ROOT = path.join(__dirname, "..");
// App.js -> Window.js logs `Instance ID: <n>` right after the shelf window's
// loadURL, i.e. once the app has booted far enough to create a window.
const READY_MARKER = "Instance ID:";

test("app boots on the upgraded Electron and creates its shelf window", async () => {
  // Resolve the Electron binary lazily so `playwright test --list` (which loads
  // this file) doesn't require the binary just to enumerate tests.
  const electronPath = require("electron");

  const child = spawn(
    electronPath,
    [APP_ROOT, "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  let output = "";
  const booted = new Promise((resolve, reject) => {
    const onData = (d) => {
      output += d.toString();
      if (output.includes(READY_MARKER)) resolve();
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("error", reject);
    child.on("exit", (code) =>
      reject(
        new Error(
          `Electron exited (code ${code}) before creating a window.\n--- output ---\n${output}`
        )
      )
    );
  });
  const timedOut = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error(`Timed out waiting for "${READY_MARKER}".\n--- output ---\n${output}`)),
      45_000
    )
  );

  try {
    await Promise.race([booted, timedOut]);
  } finally {
    child.kill("SIGKILL");
  }
});

test("File.path fix stays wired: preload exposes getPathForFile, renderer uses it", () => {
  const preload = fs.readFileSync(path.join(APP_ROOT, "src/preload.js"), "utf8");
  const renderer = fs.readFileSync(path.join(APP_ROOT, "renderer/droppoint.js"), "utf8");

  expect(preload).toMatch(/getPathForFile:\s*\(file\)\s*=>\s*webUtils\.getPathForFile\(file\)/);
  expect(renderer).toContain("window.electron.getPathForFile(f)");
  // The removed Electron API must not creep back in.
  expect(renderer).not.toMatch(/f\.path/);
});
