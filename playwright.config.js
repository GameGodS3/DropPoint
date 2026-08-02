// @ts-check
const { defineConfig } = require("@playwright/test");

// Minimal Playwright config for the Electron smoke test.
// No browser projects are declared — the suite drives the Electron app itself
// via `_electron`, so Playwright's bundled browsers are never needed.
module.exports = defineConfig({
  testDir: "./test",
  testMatch: "**/*.spec.js",
  // Generous timeout: the first Electron launch on a cold CI runner can be
  // slow even with the binary pre-downloaded.
  timeout: 120_000,
  workers: 1,
  fullyParallel: false,
  reporter: "list",
});
