const { app, BrowserWindow, ipcMain, nativeImage } = require("electron");
const path = require("path");
const fs = require("fs");

// Drag out function
ipcMain.on("ondragstart", (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: nativeImage
      .createFromPath(__dirname + "/document.png")
      .resize({ width: 200 }),
  });
  app.quit();
});

// Main Window
function createMainWindow() {
  const win = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "disc.png"),
  });

  win.loadFile(path.join(__dirname, "index.html"));
  // win.webContents.openDevTools();
  win.removeMenu();
}
app.whenReady().then(createMainWindow);

// When all windows are closed, exit app (except in Mekk OS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// When the application get activated, create main window if one does not exist
app.on("activate", () => {
  if (BrowserWindow.getAllWindows.length === 0) {
    createMainWindow();
  }
});
