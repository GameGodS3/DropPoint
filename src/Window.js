const { BrowserWindow, screen, nativeImage } = require("electron");
const path = require("path");

const { droppointDefaultIcon } = require("./Icons");
require("./RequestHandlers");

let defaultWindowConfig = {
  width: 200,
  height: 200,
  x: 0, // For creating a session at the top middle of the screen
  y: 0,
  frame: false,
  titleBarStyle: "hidden",
  transparent: true,
  resizable: false,
  alwaysOnTop: true,
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, "preload.js"),
  },

  icon: nativeImage.createFromPath(droppointDefaultIcon),
};

function devConfig() {
  defaultWindowConfig.resizable = true;
  defaultWindowConfig.frame = true;
  defaultWindowConfig.titleBarStyle = "default";
}

function createMainWindow(debug) {
  let win;
  let width = screen.getPrimaryDisplay().bounds.width;
  defaultWindowConfig.x = width / 2 - 100;

  if (debug) {
    devConfig();
    win = new BrowserWindow(defaultWindowConfig);
    win.webContents.openDevTools();
  } else {
    win = new BrowserWindow(defaultWindowConfig);
  }

  win.loadFile(path.join(__dirname, "../static/index.html"));
  win.setVisibleOnAllWorkspaces(true);
  win.shadow = true;
  win.removeMenu();
}

module.exports = {
  createMainWindow: createMainWindow,
};
