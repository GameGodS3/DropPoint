const defaultAppConfig = {
  debug: false,
  alwaysOnTop: true,
  openAtCursorPosition: false,
  shortcutAction: "toggle",
};
const appConfigSchema = {
  debug: {
    type: "boolean",
  },
  alwaysOnTop: {
    type: "boolean",
  },
  openAtCursorPosition: {
    type: "boolean",
  },
  shortcutAction: {
    enum: ["toggle", "spawn"],
    type: "string",
  },
};
module.exports = {
  defaults: defaultAppConfig,
  schema: appConfigSchema,
};
