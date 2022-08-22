const { Tray, Menu, nativeImage, app } = require("electron");
const { droppointDefaultIcon } = require("./Icons");
const { Settings } = require("./Settings");
const { Instance } = require("./Window");
// const { getHistory } = require("./History");

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
      label: "Settings",
      click: function () {
        const settings = new Settings();
        settings.openSettings();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.exit();
      },
    },
    // {
    //   type: "separator",
    // },
    // {
    //   label: "History",
    //   enabled: false,
    // },
  ];

  const setTrayHistory = async () => {
    const history = await getHistory();
    history.history.slice(-5).forEach((instance, index) => {
      if (instance.files.length !== 0) {
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
          submenu: [
            {
              label: "Files",
              enabled: false,
            },
            {
              label:
                instance.files.length < 2
                  ? `${instance.files[0].filePath.toString().split("/").pop()}`
                  : `${instance.files[0].filePath
                      .toString()
                      .split("/")
                      .pop()} and others`,

              enabled: false,
            },
          ],
        });
      }
    });
    tray.setContextMenu(Menu.buildFromTemplate(trayMenu));
  };
  // setTrayHistory();

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
