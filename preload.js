const { contextBridge, ipcRenderer } = require("electron");
// const path = require("path");

contextBridge.exposeInMainWorld("electron", {
  startDrag: (filelist) => {
    ipcRenderer.send("ondragstart", filelist);
  },
  minimise: () => {
    ipcRenderer.send("minimise");
  },
});

console.log("preload");
