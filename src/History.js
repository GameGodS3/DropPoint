const fs = require("fs");

const getHistory = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("fileHistory.json", (err, data) => {
      if (err) reject(err);

      let history = JSON.parse(data);
      resolve(history);
    });
  });
};

const initHistory = (instance) => {
  getHistory()
    .then((history) => {
      let historyObj = history;
      historyObj.history.push({
        instanceObj: instance,
        files: [],
      });
      // let historySet = new Set(history.history);
      // console.log(historySet);
      // historySet.add(instance);
      // historyObj.history = [...historySet];
      // console.log(historyObj.history);

      const json = JSON.stringify(historyObj);

      fs.writeFile("fileHistory.json", json, (e) => {
        if (e) throw e;
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const getLatestInstance = () => {
  getHistory().then((history) => {
    const latestInstance = history.history.slice(-1).instanceObj;
    console.log("History.js LatestInstace: " + latestInstance);
    return latestInstance;
  });
};

module.exports = {
  initHistory: initHistory,
  getHistory: getHistory,
  getLatestInstance: getLatestInstance,
};
