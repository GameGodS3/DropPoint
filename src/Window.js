const { BrowserWindow, screen, nativeImage } = require("electron");
const path = require("path");

const { droppointDefaultIcon } = require("./Icons");
require("./RequestHandlers");

/**
 * DropPoint Instance class.
 * Multiple instances of DropPoint can be maintained with this.
 * Each instance can be uniquely identified by id object
 *
 * @param {Boolean} devFlag - to open dev mode | false
 *
 */
class Instance {
  constructor(devFlag = false) {
    this.instance = null;
    this.id = +new Date();
    this.windowConfig = {
      width: devFlag ? null : 200,
      height: devFlag ? null : 200,
      x: 0, // For creating a session at the top middle of the screen
      y: 0,
      transparent: true,
      frame: devFlag ? true : false,
      titleBarStyle: devFlag ? "default" : "hidden",
      resizable: devFlag ? true : false,
      fullscreenable: devFlag ? true : false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
      },

      icon: nativeImage.createFromPath(droppointDefaultIcon),
    };
  }

  createNewWindow() {
    this.windowConfig.x = this.getCursorPos().x;
    this.windowConfig.y = this.getCursorPos().y;

    this.instance = new BrowserWindow(this.windowConfig);

    this.instance.loadFile(path.join(__dirname, "../static/index.html"));

    this.instance.setVisibleOnAllWorkspaces(true);

    if (process.platform === "darwin")
      this.instance.setWindowButtonVisibility(false);

    this.instance.shadow = true;
    this.instance.removeMenu();

    this.instance.on("closed", () => (this.instance = null));

    return this.id ? this.instance : null;
  }

  getCursorPos() {
    let point = screen.getCursorScreenPoint();
    let screenWidth = screen.getPrimaryDisplay().bounds.width;

    // Position instance of window at Cursor position
    console.log(point);
    console.log(point.x);
    console.log(point.y);
    const xPoint = point.x;
    const yPoint = point.y - this.windowConfig.height;

    console.log(xPoint + this.windowConfig.width);

    /* On Windows and Linux, cursor can go beyond screen in the top and right edges hence
   window needs to be repositioned to stay within screen */
    if (xPoint + this.windowConfig.width > screenWidth) {
      xPoint = screenWidth - this.windowConfig.width;
    }
    if (yPoint < 0) {
      yPoint = 0;
    }
    return { x: xPoint, y: yPoint };
  }
}

module.exports = {
  Instance: Instance,
};
