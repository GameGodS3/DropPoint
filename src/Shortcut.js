const { globalShortcut, BrowserWindow } = require("electron");
const { Instance } = require("./Window");

/**
 * Sets Shift + Caps Lock as Shortcut. Change to convenience
 */
const setShortcut = () => {
  let visible = true;

  let shortcut = "Shift+Capslock";

  if (process.platform === "darwin") {
    shortcut = "Shift+Tab";
  }

  const ret = globalShortcut.register(shortcut, () => {
    const instance = new Instance();
    if (instance.createNewWindow() !== null) {
      // instance.instance.close();
      console.log("New Window created");
    }
  });

  if (!ret) {
    console.log("KeyboardShorcutError");
  }
};

module.exports = {
  setShortcut: setShortcut,
};
