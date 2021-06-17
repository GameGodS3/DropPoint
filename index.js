const {
  app,
  BrowserWindow,
  ipcMain,
  nativeImage,
  screen,
} = require("electron");
const path = require("path");
const fs = require("fs");

// Drag out function
ipcMain.on("ondragstart", (event, filePath, fileType) => {
  if (fileType != "application") {
    fileType = fileType + ".png";
  } else {
    fileType = "file.png";
  }
  event.sender.startDrag({
    file: filePath,
    icon: nativeImage
      .createFromPath(__dirname + "/" + fileType)
      .resize({ width: 200 }),
  });
  app.quit();
});

// Main Window
function createMainWindow() {
  let display = screen.getPrimaryDisplay();
  let height = display.bounds.height;
  let width = display.bounds.width;
  const win = new BrowserWindow({
    width: 200,
    height: 200,
    x: width / 2 - 100,
    y: 0,
    frame: false,
    titleBarStyle: "hidden",
    transparent: true,
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
