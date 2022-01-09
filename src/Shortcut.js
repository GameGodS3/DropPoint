const { globalShortcut } = require("electron");
const { Instance } = require("./Window");
const { getLatestInstance } = require("./History");

/**
 * Sets Shift + Caps Lock as Shortcut. Change to convenience
 */
const setShortcut = () => {
  let shortcut = "Shift+Capslock";

  if (process.platform === "darwin") {
    shortcut = "Shift+Tab";
  }

  const ret = globalShortcut.register(shortcut, () => {
    // const instance = new Instance(true);
    // if (instance.createNewWindow() !== null) {
    //   // instance.instance.close();
    //   console.log("New Window created");
    // }
    getLatestInstance().then((latestInstance) => {
      console.log("Shortcut.js: " + latestInstance);
      console.log(latestInstance[0]);
    });
  });

  if (!ret) {
    console.log("KeyboardShorcutError");
  }
};

module.exports = {
  setShortcut: setShortcut,
};
