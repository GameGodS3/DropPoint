const { ipcMain, nativeImage } = require("electron");
const configOptions = require("./configOptions");
const Store = require("electron-store");

global.share = { ipcMain };

// const { addToInstanceHistory } = require("./History");
const icons = require("./Icons");

/**
 * Assigns file icons according to type. If multiple files, use multifile icon.
 * @param {Array} fileList The collection of files currently dragged into the window
 * @return {String} Name of icon according to filetype
 */
let getFileTypeIcons = (fileList) => {
  let fileType;
  if (fileList.length <= 1) {
    fileType = fileList[0].fileType;
    if (fileType !== "application") {
      fileType = icons[fileType];
    } else {
      fileType = icons.file;
    }
  } else {
    fileType = icons.multifile;
  }
  return fileType;
};

/**
 * Returns list of file paths of all the files in filelist.
 * Necessary for startDrag API of electron
 *
 * @param {Array} fileList - List of files
 * @return {Array} List of paths of files in fileList
 */
let getFilePathList = (fileList) => {
  let filePathList = [];
  fileList.forEach((element) => {
    filePathList.push(element.filepath);
  });
  return filePathList;
};

/**
 * Activates Drag-and-Drop API of electron. Handles drag icon attributes.
 * Minimises instance after operation
 *
 * @param {Array} fileList - List of files
 */
let dragHandler = ipcMain.on("ondragstart", (event, params) => {
  console.log("Params - filelist: " + JSON.stringify(params));
  let fileTypeIcons = getFileTypeIcons(params.filelist);
  let filePathList = getFilePathList(params.filelist);
  event.sender.startDrag({
    files: filePathList,
    icon: nativeImage.createFromPath(fileTypeIcons).resize({ width: 64 }),
  });
  // addToInstanceHistory(params.instanceId, params.filelist);
  event.sender.send("close-signal");
});

/**
 * For minimising instance on clicking the button
 */
let minimiseHandler = ipcMain.on("minimise", (event) => {
  event.sender.send("close-signal");
});

/**
 * For printing custom debug log in development console rather than browser
 */
let debugPrint = ipcMain.on("debugPrint", (event, message) => {
  console.log("[*] Debug Print: ");
  console.log(message);
});

/**
 * Fetching config and schema
 */
let fetchConfig = ipcMain.on("fetchConfig", (event) => {
  const config = new Store(configOptions);
  const schema = configOptions.schema;
  event.sender.send(
    "configObj",
    JSON.stringify({
      config: config,
      schema: schema,
    })
  );
});

// For applying new settings
ipcMain.on("applySettings", (event, newSettings) => {
  const config = new Store(configOptions);
  console.log("Received new settings in main process");
  config.set(newSettings);
  console.log("Applied new settings in main process");
})


module.exports = {
  dragHandler: dragHandler,
  minimiseHandler: minimiseHandler,
  debugPrint: debugPrint,
  fetchConfig: fetchConfig,
};
