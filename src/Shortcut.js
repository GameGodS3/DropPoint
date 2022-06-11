const { globalShortcut } = require("electron");
const { Instance } = require("./Window");

/**
 * Sets Shift + Caps Lock as Shortcut. Change to convenience
 */
const setShortcut = () => {
  let shortcut = "Shift+Capslock";

  if (process.platform === "darwin") {
    shortcut = "Shift+Tab";
  }

  const ret = globalShortcut.register(shortcut, () => {
    const instance = new Instance();
    if (instance.createNewWindow() !== null) {
      console.log("New Window created");
    }
  });

  if (!ret) {
    console.error("KeyboardShorcutError");
  }
};

module.exports = {
  setShortcut: setShortcut,
};
