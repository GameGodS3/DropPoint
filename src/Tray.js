const { Tray, Menu, nativeImage, app } = require("electron");
const { droppointDefaultIcon } = require("./Icons");
const { Instance } = require("./Window");
const { getHistory } = require("./History");

let trayIcon = nativeImage
  .createFromPath(droppointDefaultIcon)
  .resize({ width: 16 });

let tray;

/**
 * Sets system tray
 */
const setTray = () => {
  tray = new Tray(trayIcon);
  let trayMenu = [
    {
      label: "New Instance",
      click: function () {
        const instance = new Instance();
        const instanceID = instance.createNewWindow();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.exit();
      },
    },
    {
      type: "separator",
    },
  ];

  const setTrayHistory = async () => {
    const history = await getHistory();
    history.history.slice(-5).forEach((instance, index) => {
      const d = new Date(instance.instanceId);
      trayMenu.push({
        label: `${
          d.getDate() +
          "/" +
          (d.getMonth() + 1) +
          "/" +
          d.getFullYear() +
          " " +
          d.getHours().toLocaleString("en", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) +
          ":" +
          d.getMinutes().toLocaleString("en", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        }`,
      });
    });
    tray.setContextMenu(Menu.buildFromTemplate(trayMenu));
  };
  setTrayHistory();

  tray.setContextMenu(Menu.buildFromTemplate(trayMenu));
  tray.setToolTip("DropPoint");

  tray.on("double-click", () => {
    const instance = new Instance();
    instance.createNewWindow();
  });
};

module.exports = {
  setTray: setTray,
};
