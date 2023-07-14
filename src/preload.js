const { contextBridge, ipcRenderer } = require("electron");
// const path = require("path");

contextBridge.exposeInMainWorld("electron", {
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
ipcRenderer.on("history-instance", (event, filelist) => { });

console.log("preload");
