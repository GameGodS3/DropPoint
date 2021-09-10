const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const { createMainWindow } = require("./Window");
const { setShortcut } = require("./Shortcut");
const { droppointDefaultIcon } = require("./Icons");
const { setTray } = require("./Tray");

app
  .on("ready", () => {
    // Splash screen to run in background and keep app alive
    let splashScreen = new BrowserWindow({
      width: 400,
      height: 200,
      frame: false,
      titleBarStyle: "hidden",
      transparent: true,
      icon: nativeImage.createFromPath(droppointDefaultIcon),
    });
    splashScreen.loadFile(path.join(__dirname, "../static/media/splash.jpeg"));
    splashScreen.removeMenu();
    setTimeout(() => {
      splashScreen.hide();
    }, 3000);
    if (BrowserWindow.getAllWindows.length === 0) {
      if (createMainWindow()) {
        setTray();
        setShortcut();
      }
    }
  })
  .on("activate", () => {
    autoUpdater.checkForUpdatesAndNotify();
    if (BrowserWindow.getAllWindows.length === 0) {
      createMainWindow();
    }
  })
  .on("will-quit", () => {
    globalShortcut.unregisterAll();
  });
module.exports = { whenReady: app.whenReady };
