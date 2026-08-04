const path = require("path");
const { app } = require("electron");
const fs = require("fs");

// Persist history in the app's userData directory so it lands in a stable,
// per-user location regardless of the working directory the app was launched
// from. (Previously this used a bare relative path resolved against CWD.)
const historyPath = path.join(app.getPath("userData"), "instanceHistory.json");

const EMPTY_HISTORY = { history: [] };

/**
 * Reads the persisted history. Never rejects on a missing/corrupt file —
 * resolves an empty history instead, so a history glitch can't take down the app.
 * @returns {Promise<{history: Array<{instanceId: number, files: Array}>}>}
 */
const getHistory = () => {
  return new Promise((resolve) => {
    fs.readFile(historyPath, "utf8", (err, data) => {
      if (err) return resolve({ history: [] });
      try {
        const parsed = JSON.parse(data);
        resolve(parsed && Array.isArray(parsed.history) ? parsed : { history: [] });
      } catch (e) {
        resolve({ history: [] });
      }
    });
  });
};

/**
 * Writes the history object to disk.
 * @param {Object} historyObj
 * @returns {Promise<void>}
 */
const setHistory = (historyObj) => {
  return new Promise((resolve, reject) => {
    // The userData dir normally exists, but ensure it before writing so a
    // first-run race can't drop the history file.
    fs.mkdir(path.dirname(historyPath), { recursive: true }, () => {
      fs.writeFile(historyPath, JSON.stringify(historyObj), { flag: "w" }, (e) => {
        if (e) reject(e);
        else resolve();
      });
    });
  });
};

/**
 * Records the files dragged out of an instance. Upserts by instanceId, then
 * caps the list to the most recent `max` entries to bound file growth.
 *
 * @param {number} instanceId - Unique id of the instance
 * @param {Array<{filepath: string, fileType: string}>} files - Files dragged out
 * @param {number} [max=20] - Maximum number of entries to retain
 */
const addToInstanceHistory = async (instanceId, files, max = 20) => {
  if (!files || files.length === 0) return;

  const store = await getHistory();
  const existing = store.history.find((e) => e.instanceId === instanceId);
  if (existing) {
    existing.files = files;
  } else {
    store.history.push({ instanceId, files });
  }

  const limit = Number.isInteger(max) && max > 0 ? max : 20;
  if (store.history.length > limit) {
    store.history = store.history.slice(-limit);
  }

  try {
    await setHistory(store);
  } catch (e) {
    console.error("Failed to write instance history:", e);
  }
};

/**
 * Clears all recorded history.
 */
const clearHistory = async () => {
  try {
    await setHistory({ history: [] });
  } catch (e) {
    console.error("Failed to clear instance history:", e);
  }
};

module.exports = {
  getHistory: getHistory,
  addToInstanceHistory: addToInstanceHistory,
  clearHistory: clearHistory,
};
