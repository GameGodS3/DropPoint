const defaultAppConfig = {
  alwaysOnTop: true,
  openAtCursorPosition: false,
  shortcutAction: "toggle",
  debug: false,
};
const appConfigSchema = {
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
  debug: {
    type: "boolean",
    title: "Enable debug mode",
  },
};
module.exports = {
  defaults: defaultAppConfig,
  schema: appConfigSchema,
};
