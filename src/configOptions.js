const defaultAppConfig = {
  debug: false,
  alwaysOnTop: true,
  openAtCursorPosition: false,
  shortcutAction: "toggle",
};
const appConfigSchema = {
  debug: {
    type: "boolean",
    title: "Enable debug mode",
  },
  alwaysOnTop: {
    type: "boolean",
    title: "Always on Top",
  },
  openAtCursorPosition: {
    type: "boolean",
    title: "Open at cursor position",
  },
  shortcutAction: {
    enum: ["toggle", "spawn"],
    type: "string",
    title: "Shortcut Behaviour",
  },
};
module.exports = {
  defaults: defaultAppConfig,
  schema: appConfigSchema,
};
