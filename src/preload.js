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
});

ipcRenderer.on("close-signal", (event) => {
  window.close();
});
ipcRenderer.on("history-instance", (event, filelist) => {});

console.log("preload");
