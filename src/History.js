const fs = require("fs");

const initHistory = (id) => {
  let historyObj = getHistory();

  historyObj.history.push({
    instanceID: id,
    files: [],
  });

  const json = JSON.stringify(historyObj);

  fs.writeFile("fileHistory.json", json, (err) => {
    if (err) throw err;
  });
};

const getHistory = () => {
  let buffer = fs.readFileSync("fileHistory.json");
  let history = JSON.parse(buffer);
  return history;
};

module.exports = {
  initHistory: initHistory,
  getHistory: getHistory,
};
