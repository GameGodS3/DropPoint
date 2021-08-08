// import { BrowserWindow, nativeImage, screen } from "electron";
// import { path } from "path";
// import { droppointDefaultIcon } from "./Icons";

const { BrowserWindow, nativeImage, screen } = require("electron");
const path = require("path");
const { droppointDefaultIcon } = require("./Icons");

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
  icon: droppointDefaultIcon,
};

function createMainWindow(debug) {
  let win;
  let width = screen.getPrimaryDisplay().bounds.width;
  defaultWindowConfig.x = width / 2 - 100;

  if (debug) {
    defaultWindowConfig.resizable = true;
    defaultWindowConfig.frame = true;
    defaultWindowConfig.titleBarStyle = "default";
    win = new BrowserWindow(defaultWindowConfig);
    win.webContents.openDevTools();
  } else {
    win = new BrowserWindow(defaultWindowConfig);
  }
  console.log(path.join(__dirname, "../index.html"));

  win.loadFile(path.join(__dirname, "../index.html"));
  win.setVisibleOnAllWorkspaces(true);
  win.shadow = true;
  win.removeMenu();
}

// export { createMainWindow };
