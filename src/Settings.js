const path = require("path");

const { BrowserWindow, webContents, nativeImage } = require("electron");
const Store = require("electron-store");
const { droppointDefaultIcon } = require("./Icons");
const configOptions = require("./configOptions");

class Settings {
  constructor() {
    this.settings = null;
    this.settingsWindowConfig = {
      title: "Settings - DropPoint",
    };
  }

  openSettings() {
    const allWindows = BrowserWindow.getAllWindows();
    for (let i = 0; i < allWindows.length; i++) {
      const win = allWindows[i];
      if (win.getTitle().split(" ")[0] === "Settings") {
        return;
      }
    }
    this.settings = new BrowserWindow({
      title: "Settings - DropPoint",
      width: 600,
      height: 450,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
        icon: nativeImage.createFromPath(droppointDefaultIcon),
      },
    });
    // this.settings.webContents.openDevTools(); // For Debugging purposes
    this.settings.removeMenu();
    const html_path = path.join(__dirname, "../static/settings.html");
    this.settings.loadURL(`file://${html_path}`).then(() => { });
  }
}

module.exports = {
  Settings: Settings,
};
