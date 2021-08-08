const {
  app,
  BrowserWindow,
  ipcMain,
  nativeImage,
  screen,
  Tray,
  Menu,
  globalShortcut,
} = require("electron");
const path = require("path");

// Quit/Minimize to tray control variables
let isQuiting;
let tray;

// Code for auto updates
const autoUpdater = require("electron-updater");
const { platform } = require("os");

// Main Window
function createMainWindow() {
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  const win = new BrowserWindow({
    width: 200,
    height: 200,
    x: width / 2 - 100,
    y: 0,
    frame: false,
    titleBarStyle: "hidden",
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: nativeImage.createFromPath(
      path.join(__dirname, "/media/png/droppoint-symbolic.png")
    ),
  });

  // Window Content
  win.loadFile(path.join(__dirname, "index.html"));
  win.setVisibleOnAllWorkspaces(true);
  win.shadow = true;
  // win.webContents.openDevTools();
  win.removeMenu();

  // Tray code
  let trayIcon;
  // Linux needs different icon for tray
  if (process.platform != "linux") {
    trayIcon = path.join(__dirname, "/media/ico/droppoint.ico");
  } else {
    trayIcon = nativeImage
      .createFromPath(path.join(__dirname, "/media/png/dropoint-symbolic.png"))
      .resize({ width: 16 });
  }
  tray = new Tray(trayIcon);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show App",
        click: function () {
          win.show();
        },
      },
      {
        label: "Quit",
        click: function () {
          isQuiting = true;
          app.quit();
        },
      },
    ])
  );

  tray.on("click", () => {
    win.show();
  });

  tray.setToolTip("DropPoint");
  // On clicking close, hide window to tray instead of quitting
  win.on("close", (e) => {
    if (!isQuiting) {
      e.preventDefault();
      win.hide();
      e.returnValue = false;
    }
  });

  // Drag out function
  ipcMain
    .on("ondragstart", (event, fileList) => {
      let fileType;
      // Assigning file icons according to type. If multiple files, use multifile icon.
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
        win.hide();
      }
    })
    .on("minimise", () => {
      win.hide();
    });

  // Global shortcut
  let visible = true;
  const ret = globalShortcut.register("Shift+Capslock", () => {
    if (visible) {
      win.hide();
      visible = false;
    } else {
      win.show();
      visible = true;
    }
  });
  if (!ret) {
    console.log("KeyboardShorcutError");
  }
}
app.whenReady().then(createMainWindow);

// When all windows are closed, exit app (except in Mekk OS)
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// When the application get activated, create main window if one does not exist
app.on("activate", () => {
  autoUpdater.checkForUpdatesAndNotify();
  if (BrowserWindow.getAllWindows.length === 0) {
    createMainWindow();
  }
});

// Clear global shortcuts on app exit
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
