const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const { createMainWindow } = require("./Window");

app.whenReady().then(createMainWindow);

app.on("activate", () => {
  autoUpdater.checkForUpdatesAndNotify();
  if (BrowserWindow.getAllWindows.length === 0) {
    createMainWindow();
  }
});

module.exports = { whenReady: app.whenReady };
