const { contextBridge, ipcRenderer } = require("electron");
// const path = require("path");

contextBridge.exposeInMainWorld("electron", {
  startDrag: (filepath, filetype) => {
    ipcRenderer.send("ondragstart", filepath, filetype);
  },
});

console.log("preload");
