global.DROPPOINT_MAIN = null;

const { BrowserWindow, screen, nativeImage } = require("electron");
const path = require("path");

const { droppointDefaultIcon } = require("./Icons");
require("./RequestHandlers"); // For Drag and Drop and Minimise handling

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
  let width = screen.getPrimaryDisplay().bounds.width;
  defaultWindowConfig.x = width / 2 - 100;

  if (debug) {
    devConfig();
    DROPPOINT_MAIN = new BrowserWindow(defaultWindowConfig);
    DROPPOINT_MAIN.webContents.openDevTools();
  } else {
    DROPPOINT_MAIN = new BrowserWindow(defaultWindowConfig);
  }

  DROPPOINT_MAIN.loadFile(path.join(__dirname, "../static/index.html"));
  DROPPOINT_MAIN.setVisibleOnAllWorkspaces(true);
  DROPPOINT_MAIN.shadow = true;
  DROPPOINT_MAIN.removeMenu();

  DROPPOINT_MAIN.on("closed", () => {
    DROPPOINT_MAIN = null;
  });
}

module.exports = {
  createMainWindow: createMainWindow,
};
