const { app } = require("electron");
const fs = require("fs");

const getHistory = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync("fileHistory.json")) initHistoryFile();

    fs.readFile("fileHistory.json", (err, data) => {
      if (err) reject(err);

      let history = JSON.parse(data);
      resolve(history);
    });
  });
};

const setHistory = (historyObj) => {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(historyObj);
    fs.writeFile("fileHistory.json", json, { flag: "w" }, (e) => {
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
      // let historySet = new Set(history.history);
      // console.log(historySet);
      // historySet.add(instance);
      // historyObj.history = [...historySet];
      // console.log(historyObj.history);

      setHistory(historyObj);
    })
    .catch((err) => {
      console.error(err);
      app.quit();
    });
};

const getLatestInstance = async () => {
  // getHistory().then((history) => {
  //   const latestInstance = history.history.slice(-1);
  //   console.log("History.js LatestInstace: " + latestInstance);
  //   return latestInstance;
  // });
  try {
    const history = await getHistory();
    const latestInstance = history.history.slice(-1);
    return latestInstance;
  } catch (error) {
    console.error(error);
  }
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
  getLatestInstance: getLatestInstance,
  addToInstanceHistory: addToInstanceHistory,
};
