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
  fullscreenable: false,
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, "preload.js"),
  },

  icon: nativeImage.createFromPath(droppointDefaultIcon),
};

function devConfig() {
  defaultWindowConfig.frame = true;
  defaultWindowConfig.titleBarStyle = "default";
  defaultWindowConfig.resizable = true;
  defaultWindowConfig.width = null;
  defaultWindowConfig.height = null;
  defaultWindowConfig.fullscreenable = true;
}

/**
 * Creates a global instance of DropPoint when called.
 * Only one instance of DropPoint at a time will be stable.
 * Multiple instances may cause errors
 *
 * @param {Boolean} debug - pass "true" to get Debug settings
 * @returns {Boolean} true if successful
 */
function createMainWindow(debug = false) {

  let point = screen.getCursorScreenPoint()
  let screenWidth = screen.getPrimaryDisplay().bounds.width;

  // Position instance of window at Cursor position
  defaultWindowConfig.y = point.y - defaultWindowConfig.height;
  defaultWindowConfig.x = point.x;

  console.log(defaultWindowConfig.x + defaultWindowConfig.width);

  /* On Windows and Linux, cursor can go beyond screen in the top and right edges hence 
   window needs to be repositioned to stay within screen */
  if (defaultWindowConfig.x + defaultWindowConfig.width > screenWidth) {
    defaultWindowConfig.x = screenWidth - defaultWindowConfig.width;
  }
  if (defaultWindowConfig.y < 0) {
    defaultWindowConfig.y = 0;
  }

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
  if (DROPPOINT_MAIN) {
    return true;
  }
  return false;
}

module.exports = {
  createMainWindow: createMainWindow,
};
