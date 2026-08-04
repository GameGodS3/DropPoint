const path = require("path");
const fs = require("fs");
const { Tray, Menu, nativeImage, app } = require("electron");
const { droppointDefaultIcon } = require("./Icons");
const { Settings } = require("./Settings");
const { Instance } = require("./Window");
const { getHistory, clearHistory } = require("./History");

// On Windows, hand the multi-resolution .ico straight to the tray so the OS
// can pick the DPI-appropriate frame. Resizing a nativeImage built from an
// .ico down to a fixed 16px renders a blank (but still clickable) tray icon
// on HiDPI Windows displays. macOS/Linux expect a small ~16px image.
let trayIcon = nativeImage.createFromPath(droppointDefaultIcon);
if (process.platform !== "win32") {
  trayIcon = trayIcon.resize({ width: 16 });
}

let tray;

/**
 * Formats an instance timestamp as DD/MM/YYYY HH:MM.
 * @param {number} instanceId - The instance id, which is a millisecond timestamp
 */
const formatTimestamp = (instanceId) => {
  const d = new Date(instanceId);
  const pad = (n) =>
    n.toLocaleString("en", { minimumIntegerDigits: 2, useGrouping: false });
  return (
    `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
};

/**
 * Builds a short "file.txt" / "file.txt and 2 others" summary for an entry.
 * @param {Array<{filepath: string}>} files
 */
const summariseFiles = (files) => {
  const first = path.basename(files[0].filepath);
  return files.length < 2 ? first : `${first} and ${files.length - 1} others`;
};

/**
 * Opens a new shelf instance seeded with the given history files, skipping any
 * that no longer exist on disk.
 * @param {Array<{filepath: string, fileType: string}>} files
 */
const reopenFromHistory = (files) => {
  const existing = files.filter((f) => fs.existsSync(f.filepath));
  if (existing.length === 0) return;
  new Instance().createNewWindow(existing);
};

/**
 * Builds the tray context menu template: the base actions plus a clickable
 * entry for each recent history item that still has files.
 * @param {{history: Array}} history
 */
const buildTrayMenu = (history) => {
  const menu = [];

  // History lives at the very top (closest to the cursor), collapsed into a
  // submenu. Disabled when there's nothing recorded yet.
  const recent = history.history.filter((e) => e.files && e.files.length !== 0);
  if (recent.length === 0) {
    menu.push({ label: "History", enabled: false });
  } else {
    // Most recent first, capped at 5, each clickable to reopen.
    const historyItems = recent
      .slice(-5)
      .reverse()
      .map((entry) => ({
        label: `${formatTimestamp(entry.instanceId)}  —  ${summariseFiles(entry.files)}`,
        click: () => reopenFromHistory(entry.files),
      }));

    historyItems.push({ type: "separator" });
    historyItems.push({
      label: "Clear history",
      click: async () => {
        await clearHistory();
        refreshTrayMenu();
      },
    });

    menu.push({ label: "History", submenu: historyItems });
  }

  menu.push({ type: "separator" });
  menu.push({ label: "New Instance", click: () => new Instance().createNewWindow() });
  menu.push({ label: "Settings", click: () => new Settings().openSettings() });
  menu.push({ label: "Quit", click: () => app.exit() });

  return menu;
};

/**
 * Rebuilds the tray context menu from the persisted history.
 */
const refreshTrayMenu = async () => {
  if (!tray) return;
  const history = await getHistory();
  tray.setContextMenu(Menu.buildFromTemplate(buildTrayMenu(history)));
};

/**
 * Sets system tray
 */
const setTray = () => {
  tray = new Tray(trayIcon);

  // Show the base menu immediately, then load history asynchronously.
  tray.setContextMenu(Menu.buildFromTemplate(buildTrayMenu({ history: [] })));
  tray.setToolTip("DropPoint");
  refreshTrayMenu();

  // Rebuild whenever a drag-out records a new history entry.
  app.on("history-updated", () => refreshTrayMenu());

  tray.on("double-click", () => {
    new Instance().createNewWindow();
  });
};

module.exports = {
  setTray: setTray,
};
