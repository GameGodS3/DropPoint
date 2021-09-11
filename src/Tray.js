const { Tray, Menu, nativeImage, app } = require("electron");
const { droppointDefaultIcon } = require("./Icons");
const { createMainWindow } = require("./Window");

let trayIcon = nativeImage
  .createFromPath(droppointDefaultIcon)
  .resize({ width: 16 });

let tray;

/**
 * Sets system tray
 */
const setTray = () => {
  tray = new Tray(trayIcon);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "New Instance",
        click: function () {
          if (!DROPPOINT_MAIN) {
            createMainWindow();
          } else {
            tray.displayBalloon({
              title: "DropPoint",
              content: "Instance already exists!",
              icon: nativeImage.createFromPath(droppointDefaultIcon),
            });
          }
        },
      },
      {
        label: "Quit",
        click: function () {
          app.exit();
        },
      },
    ])
  );
  tray.setToolTip("DropPoint");
  tray.on("double-click", () => {
    if (!DROPPOINT_MAIN) {
      createMainWindow();
    } else {
      DROPPOINT_MAIN.close();
    }
  });
};

module.exports = {
  setTray: setTray,
};
