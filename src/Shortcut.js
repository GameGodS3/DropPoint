const { globalShortcut, BrowserWindow } = require("electron");
const { createMainWindow } = require("./Window");

/**
 * Sets Shift + Caps Lock as Shortcut. Change to convenience
 */
const setShortcut = () => {
  let visible = true;

  let shortcut = "Shift+Capslock";

  if (process.platform === "darwin") {
    shortcut = "Shift+Tab"
  }

  const ret = globalShortcut.register(shortcut, () => {
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
