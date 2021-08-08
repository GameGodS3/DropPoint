const { ipcMain, BrowserWindow } = require("electron");
global.share = { ipcMain };

let mainWindow;

/**
 * Assigns file icons according to type. If multiple files, use multifile icon.
 * @param {Array} fileList The collection of files currently dragged into the window
 * @return {String} Name of icon according to filetype
 */
let getFileTypeIcon = (fileList) => {
  let fileType;
  if (fileList.length <= 1) {
    fileType = fileList[0]["fileType"];
    if (fileType != "application") {
      fileType = fileType + ".png";
    } else {
      fileType = "file.png";
    }
  } else {
    fileType = "multifile.png";
  }
  return fileType;
};

module.exports = {
  dragHandler: global.share.ipcMain.on("ondragstart", (event, fileList) => {
    let fileType = getFileTypeIcon(fileList);
    let filePathList = [];
    fileList.forEach((element) => {
      filePathList.push(element["filePath"]);
    });
    event.sender.startDrag({
      files: filePathList,
      icon: nativeImage
        .createFromPath(__dirname + "/media/png/" + fileType)
        .resize({ width: 64 }),
    });
    if (isQuiting) {
      app.quit();
    } else {
      mainWindow = BrowserWindow.getFocusedWindow();
      mainWindow.hide();
    }
  }),

  minimiseHandler: ipcMain.on("minimise", () => {
    mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.hide();
  }),
};
