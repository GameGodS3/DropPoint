const booleanInput = (switchID, labelText, isChecked) => {
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
    checked=${isChecked}
    class="relative shrink-0 w-11 h-6 bg-gray-100 checked:bg-none checked:bg-cyan-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent dark:bg-gray-700 dark:checked:bg-cyan-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-cyan-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-cyan-200"
    />
  `;
  return switchInput;
};

const enumInput = (enumID, labelText, enumList, selectedVal) => {
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
    ${enumList.map(
      (option) =>
        `<option value="${option}" selected=${option === selectedVal} >${
          option[0].toUpperCase() + option.slice(1)
        }</option>`
    )}
    </select>
  `;

  return selectInput;
};

window.onload = async () => {
  electron.fetchConfig();
  electron.onConfigReceived(async (_event, value) => {
    // console.log(`Received configuration: ${value}`);
    const configResponse = JSON.parse(value);
    const configPath = configResponse.config.path;

    // const currentConfig = require(configPath);
    // fetch(configPath)
    //   .then((response) => response.json())
    //   .then((configObj) => {
    //     Object.entries(configResponse).forEach(([key, value]) => {
    //       let configType = value.type;
    //       if (configType === "boolean") {
    //         document
    //           .querySelector(".settings-content")
    //           .appendChild(booleanInput(key, value.title, configObj.key));
    //       }
    //     });
    //   });
    const response = await fetch(configPath);
    const configObj = await response.json();
    console.log(Object.entries(configObj));
    Object.entries(configObj).forEach(([key, value]) => {
      const configEntrySchema = configResponse.schema[key];
      if (configEntrySchema.type === "boolean") {
        // console.log(`Boolean Pair: ${key}, ${value}`);
        document
          .querySelector(".settings-content")
          .appendChild(booleanInput(key, configEntrySchema.title, value));
      } else if (
        configEntrySchema.type === "string" &&
        configEntrySchema.enum
      ) {
        document
          .querySelector(".settings-content")
          .appendChild(
            enumInput(
              key,
              configEntrySchema.title,
              configEntrySchema.enum,
              value
            )
          );
      }
    });
  });
};

// document
//   .querySelector(".settings-content")
//   .appendChild(
//     enumInput(
//       "selection",
//       "This is a test label for enum selection",
//       [12, 13, 14, 15]
//     )
//   );

const configResponse = {
  config: {
    events: { _events: {}, _eventsCount: 0 },
    path: "C:\\Users\\sudev\\AppData\\Roaming\\DropPoint\\config.json",
  },
  schema: {
    debug: { type: "boolean", title: "Enable debug mode" },
    alwaysOnTop: { type: "boolean", title: "Always on Top" },
    openAtCursorPosition: { type: "boolean", title: "Open at cursor position" },
    shortcutAction: {
      enum: ["toggle", "spawn"],
      type: "string",
      title: "Shortcut Behaviour",
    },
  },
};

const configObj = {
  debug: true,
  alwaysOnTop: true,
  openAtCursorPosition: false,
  shortcutAction: "toggle",
};
