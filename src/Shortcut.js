const { globalShortcut, BrowserWindow } = require("electron");
const { createMainWindow } = require("./Window");

/**
 * Sets Shift + Caps Lock as Shortcut. Change to convenience
 */
const setShortcut = () => {
  const ret = globalShortcut.register("Shift+Capslock", () => {
    if (DROPPOINT_MAIN) {
      DROPPOINT_MAIN.close();
    } else {
      createMainWindow();
    }
  });

  if (!ret) {
    console.log("KeyboardShorcutError");
  }
};

module.exports = {
  setShortcut: setShortcut,
};
