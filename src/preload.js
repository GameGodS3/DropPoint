const { contextBridge, ipcRenderer, webUtils } = require("electron");
// const path = require("path");

contextBridge.exposeInMainWorld("electron", {
  // Resolves the absolute path of a dropped File. Replaces the removed
  // File.path property (dropped in Electron 32+); must run in the preload.
  getPathForFile: (file) => webUtils.getPathForFile(file),
  getLatestInstanceId: () => {
    ipcRenderer.send("getLatestInstanceId");
  },
  dragOutListener: (params) => {
    ipcRenderer.send("ondragstart", params);
  },
  minimise: () => {
    ipcRenderer.send("minimise");
  },
  debugPrint: (message) => {
    ipcRenderer.send("debugPrint", message);
  },
  fetchConfig: () => {
    ipcRenderer.send("fetchConfig");
  },
  onConfigReceived: (callback) => {
    ipcRenderer.on("configObj", callback)
  },
  applySettingsInConfig: (newConfig) => {
    ipcRenderer.send("applySettings", newConfig)
  },
  // Receives the file list when a shelf is reopened from history, so the
  // renderer can pre-populate itself.
  onHistoryInstance: (callback) => {
    ipcRenderer.on("history-instance", callback)
  },
});

// For settings renderer
let configObj;
const updateConfigObj = (config) => {
  configObj = config;
  console.log(configObj);
};

ipcRenderer.on("configObj", (event, config) => {
  configObj = JSON.parse(config);
  const configFileContents = require(configObj.config.path);
  console.log(configFileContents);
  ipcRenderer.sendToHost(config);
  return configFileContents;
});

ipcRenderer.on("close-signal", (event) => {
  window.close();
});

console.log("preload");
