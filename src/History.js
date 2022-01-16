const { app } = require("electron");
const fs = require("fs");

const getHistory = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync("instanceHistory.json")) initHistoryFile();

    fs.readFile("instanceHistory.json", (err, data) => {
      if (err) reject(err);

      let history = JSON.parse(data);
      resolve(history);
    });
  });
};

const setHistory = (historyObj) => {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(historyObj);
    fs.writeFile("instanceHistory.json", json, { flag: "w" }, (e) => {
      if (e) reject(e);
    });
    resolve();
  });
};

const initHistoryFile = async () => {
  const historyTemplate = {
    history: [],
  };
  await setHistory(historyTemplate);
};

const initHistory = (instanceId) => {
  getHistory()
    .then((history) => {
      let historyObj = history;
      historyObj.history.push({
        instanceId: instanceId,
        files: [],
      });

      setHistory(historyObj);
    })
    .catch((err) => {
      console.error(err);
      app.quit();
    });
};

const addToInstanceHistory = async (instanceId, filelist) => {
  let history = await getHistory();

  history.history.forEach((instance, index) => {
    if (instance.instanceId === instanceId) {
      instance.files = filelist;
    }
  });

  await setHistory(history);
};

module.exports = {
  initHistory: initHistory,
  getHistory: getHistory,
  addToInstanceHistory: addToInstanceHistory,
};
