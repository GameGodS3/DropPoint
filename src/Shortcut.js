const { globalShortcut, app, webContents } = require("electron");
const { Instance } = require("./Window");
const Store = require("electron-store");
const configOptions = require("./configOptions");

/**
 * Sets Shift + Caps Lock as Shortcut. Change to convenience
 */
const setShortcut = () => {
  let shortcut = "Shift+Capslock";

  if (process.platform === "darwin") {
    //caps lock is not a modifier in mac
    shortcut = "Shift+Tab";

    //handle macos cmd q quitting
    globalShortcut.register("Cmd+Q", () => {
      app.exit();
    });
  }

  const ret = globalShortcut.register(shortcut, () => {
    const active_instances = webContents.getAllWebContents();
    const config = new Store(configOptions);

    console.log("Active Instances: " + active_instances);
    if (config.get("shortcutAction") === "toggle") {
      if (active_instances.length === 1) {
        const instance = new Instance();
        if (instance.createNewWindow() !== null) {
          console.log("New Window created");
        }
      } else {
        active_instances[0].send("close-signal");
      }
    } else {
      const instance = new Instance();
      if (instance.createNewWindow() !== null) {
        console.log("New Window created");
      }
    }
  });

  if (!ret) {
    console.error("KeyboardShorcutError");
  }
};

module.exports = {
  setShortcut: setShortcut,
};
