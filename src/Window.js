const path = require("path");

const { BrowserWindow, screen, nativeImage } = require("electron");
const Store = require("electron-store");

const { droppointDefaultIcon } = require("./Icons");
const configOptions = require("./configOptions");
require("./RequestHandlers");

class Instance {
  /**
   * DropPoint Instance class.
   * Multiple instances of DropPoint can be maintained with this.
   * Each instance can be uniquely identified by id object
   *
   * @param {Boolean} devFlag - To open dev mode. Default = False
   *
   */
  constructor(devFlag = false) {
    this.instance = null;
    this.id = +new Date();

    this.config = new Store(configOptions);

    this.devFlag = this.config.get("debug");
    this.windowConfig = {
      width: 200,
      height: 200,
      x: 0,
      y: 0,
      transparent: true,
      frame: devFlag ? true : false,
      titleBarStyle: devFlag ? "default" : "hidden",
      resizable: devFlag ? true : false,
      fullscreenable: devFlag ? true : false,
      alwaysOnTop: this.config.get("alwaysOnTop"),
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
        additionalArguments: [this.id],
      },

      icon: nativeImage.createFromPath(droppointDefaultIcon),
    };
  }

  /**
   * Creates a new DropPoint Instance
   * @param {Array<{filepath: string, fileType: string}>} [seedFiles] - Files to
   *   pre-load the shelf with (e.g. when reopening a history entry). Optional.
   * @returns {number} id - Unique ID of the instance | null if not created
   */
  createNewWindow(seedFiles = null) {
    if (this.config.get("openAtCursorPosition")) {
      const cursorPosition = this.getCursorPos();
      this.windowConfig.x = cursorPosition.x;
      this.windowConfig.y = cursorPosition.y;
    }
    else this.windowConfig.x = screen.getPrimaryDisplay().workArea.width / 2 - 100;

    this.instance = new BrowserWindow(this.windowConfig);

    const html_path = path.join(__dirname, "../static/index.html");

    this.instance.loadURL(`file://${html_path}?id=${this.id}`);

    this.instance.setVisibleOnAllWorkspaces(true);

    if (this.devFlag) this.instance.webContents.openDevTools();

    if (process.platform === "darwin")
      this.instance.setWindowButtonVisibility(false);

    this.instance.shadow = true;
    this.instance.removeMenu();

    this.instance.on("closed", () => (this.instance = null));

    // Seed the shelf with files when reopening a history entry, once the
    // renderer has loaded and can receive them.
    if (seedFiles && seedFiles.length) {
      this.instance.webContents.once("did-finish-load", () => {
        this.instance.webContents.send("history-instance", seedFiles);
      });
    }

    console.log(`Instance ID: ${this.id}`);

    return this.instance ? this.id : null;
  }

  /**
   * Gets position at which DropPoint Instance must open
   * @returns {Object} - {x: number, y: number} Coordinates of the mouse position
   */
  getCursorPos() {
    let point = screen.getCursorScreenPoint();
    let screenWidth = screen.getPrimaryDisplay().bounds.width;

    // Position instance of window at Cursor position
    console.log(`Cursor position: ${point.x}, ${point.y}`);
    let xPoint = point.x;
    let yPoint = point.y - this.windowConfig.height;

    /* On Windows and Linux, app windows can go beyond screen in the top and right edges hence
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
