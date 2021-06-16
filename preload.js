const { contextBridge, ipcRenderer } = require("electron");
// const path = require("path");

contextBridge.exposeInMainWorld("electron", {
  startDrag: (filepath) => {
    ipcRenderer.send("ondragstart", filepath);
  },
});

console.log("preload");
