const path = require("path");

const { BrowserWindow, webContents, nativeImage } = require("electron");
const Store = require("electron-store");
const { droppointDefaultIcon } = require("./Icons");

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
      height: 350,
      webPreferences: {
        nodeIntegration: true,
        icon: nativeImage.createFromPath(droppointDefaultIcon),
      },
    });
    this.settings.removeMenu();
    const html_path = path.join(__dirname, "../static/settings.html");
    this.settings.loadURL(`file://${html_path}`);
  }
}

module.exports = {
  Settings: Settings,
};
