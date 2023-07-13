const defaultAppConfig = {
  spawnOnLaunch: true,
  alwaysOnTop: true,
  openAtCursorPosition: false,
  shortcutAction: "toggle",
  debug: false,
};
const appConfigSchema = {
  spawnOnLaunch: {
    type: "boolean",
    title: "Open a new instance on launch"
  },
  alwaysOnTop: {
    type: "boolean",
    title: "Always on top",
  },
  openAtCursorPosition: {
    type: "boolean",
    title: "Open at cursor position",
  },
  shortcutAction: {
    enum: ["toggle", "spawn"],
    type: "string",
    title: "Shortcut behaviour",
  },
  debug: {
    type: "boolean",
    title: "Enable debug mode",
  },
};
module.exports = {
  defaults: defaultAppConfig,
  schema: appConfigSchema,
};
