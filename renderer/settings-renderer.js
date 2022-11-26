const booleanInput = (switchID, labelText) => {
  let switchInput = document.createElement("div");
  switchInput.classList = "flex items-center justify-between w-full";

  switchInput.innerHTML = `
    <label
    for="${switchID}"
    class="text-base w-full text-gray-600 ml-3 dark:text-gray-400"
    >${labelText}</label
    >
    <input
    type="checkbox"
    id="${switchID}"
    class="relative shrink-0 w-11 h-6 bg-gray-100 checked:bg-none checked:bg-cyan-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent dark:bg-gray-700 dark:checked:bg-cyan-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-cyan-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-cyan-200"
    />
  `;
  return switchInput;
};

const enumInput = (enumID, labelText, enumList) => {
  let selectInput = document.createElement("div");
  selectInput.classList = "flex items-center justify-between w-full";

  selectInput.innerHTML = `
    <label
    class="text-base w-full text-gray-600 mx-3 dark:text-gray-400"
    for="${enumID}">
    ${labelText}
    </label>

    <select
    id="${enumID}"
    class="py-3 px-4 pr-9 block w-fit border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
    >
    <option selected>Open this select menu</option>
    ${enumList.map((option) => `<option value="${option}">${option}</option>`)}
    </select>
  `;

  return selectInput;
};

electron.fetchConfig();
electron.onConfigReceived((_event, value) => {
  console.log(`Received configuration: ${value}`);
  const configObj = JSON.parse(value);
  const configPath = configObj.config.path;

  // const currentConfig = require(configPath);
  fetch(configPath)
    .then((response) => response.json())
    .then((json) => console.log("Received response: " + JSON.stringify(json)));

  console.log(`Current configuration: ${currentConfig}`);
});

document
  .querySelector(".settings-content")
  .appendChild(
    enumInput(
      "selection",
      "This is a test label for enum selection",
      [12, 13, 14, 15]
    )
  );

const configObj = {
  config: {
    events: { _events: {}, _eventsCount: 0 },
    path: "C:\\Users\\sudev\\AppData\\Roaming\\DropPoint\\config.json",
  },
  schema: {
    debug: { type: "boolean" },
    alwaysOnTop: { type: "boolean" },
    openAtCursorPosition: { type: "boolean" },
    shortcutAction: { enum: ["toggle", "spawn"], type: "string" },
  },
};
