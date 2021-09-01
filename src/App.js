const { app, BrowserWindow } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const { createMainWindow } = require("./Window");
const { setShortcut } = require("./Shortcut");

// app.whenReady().then(createMainWindow).then(setShortcut);

app.on("ready", () => {
  let splashScreen = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    titleBarStyle: "hidden",
    transparent: true,
  });
  splashScreen.loadFile(path.join(__dirname, "../static/media/splash.jpeg"));
  splashScreen.removeMenu();
  setTimeout(() => {
    splashScreen.hide();
  }, 3000);

  createMainWindow();
  setShortcut();
});

app.on("activate", () => {
  autoUpdater.checkForUpdatesAndNotify();
  if (BrowserWindow.getAllWindows.length === 0) {
    createMainWindow();
  }
});

module.exports = { whenReady: app.whenReady };
