// Instance ID from Main Process
const instanceId = parseInt(window.location.search.slice(4));
console.log("Instance ID: " + instanceId);

// File List which will contain list of dicts in the format
// {filePath:"file/Path", fileType:"filetype"}
let filelist = [];

// Custom event to trigger on push.
// Will be used for creating UI elements.
const filePushEvent = new Event("file-push");
Object.defineProperty(filelist, "push", {
  value: function () {
    for (var i = 0, n = this.length, l = arguments.length; i < l; i++, n++) {
      // Adding pushed element one by one into the array
      this[n] = arguments[i];
    }
    // Trigger the event
    document.dispatchEvent(filePushEvent);
    return n;
  },
});

// Testing by growing the file list
// let growfilelist = () => {
//   for (let i = 0; i < 8; i++) {
//     filelist.push({
//       fileName: "TestFile",
//       fileType: filetypes[Math.floor(Math.random() * filetypes.length)],
//     });
//   }
//   console.log(filelist);
// };

// FileQueue to implement file icons animation
class FileQueueUI {
  constructor() {
    this.queue = [];
  }
  enqueue(ele) {
    if (this.queue.length > 2) {
      this.dequeue();
    }
    this.queue.push(ele);
  }
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.queue.shift();
  }
  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.queue[0];
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  printQueue() {
    var str = "";
    for (var i = 0; i < this.queue.length; i++) {
      str += this.queue[i] + " ";
    }
    return str;
  }
  length() {
    return this.queue.length;
  }
}

// UI image elements
const imageHolder = document.querySelectorAll(".file-icon img");

let fq = new FileQueueUI();

document.addEventListener("file-push", () => {
  fq.enqueue(filelist[filelist.length - 1].fileType);
  for (let i = 0; i < fq.length(); i++) {
    imageHolder[i].src = "./media/" + fq.queue[fq.length() - 1 - i] + ".png";
  }
});

// Holder area where files will be dragged and dropped
const holder = document.getElementById("droppoint");

// Adding "dragged" class to the holder when the file is dragged over it
// "Dragged" class is used to do the border animation
holder.ondragover = (e) => {
  e.preventDefault;
  e.stopPropagation;
  holder.setAttribute("class", "dragged");
  return false;
};
holder.ondragenter = (e) => {
  e.preventDefault;
  e.stopPropagation;
  holder.setAttribute("class", "dragged");
  return false;
};
// Removing the "dragged" class from the holder
// when the file is dragged out of it
holder.ondragleave = (e) => {
  e.preventDefault;
  e.stopPropagation;
  holder.removeAttribute("class");
  return false;
};
holder.ondragend = (e) => {
  e.preventDefault;
  e.stopPropagation;
  holder.removeAttribute("class");
  return false;
};

const uploadArea = document.querySelector(".upload");
const dragOutArea = document.querySelector("#drag");
holder.ondrop = (e) => {
  e.preventDefault();
  // Remove animation borders on file drop inside DropPoint
  holder.removeAttribute("class");

  // Get the files from the event
  for (let f of e.dataTransfer.files) {
    // Check if the file is already in the filelist

    let duplicateFile = false;

    for (let i = 0; i < filelist.length; i++) {
      if (filelist[i].filepath.includes(f.name)) {
        duplicateFile = true;
        break;
      }
    }

    if (duplicateFile) {
      alert("File already in the instance");
      continue;
    }
    // Add the file to the filelist
    filelist.push({
      filepath: f.path.toString(),
      fileType:
        f.type.split("/")[0] !== "application" ? f.type.split("/")[0] : "file",
    });
  }

  uploadArea.style.display = "none";
  dragOutArea.style.display = "flex";
};

const fileicons = document.querySelector(".file-icon");
let dragicons = document.getElementsByClassName("files");
const clearDrag = () => {
  filelist = [];
  if (dragicons[2]) {
    fileicons.removeChild(dragicons[2]);
  }
  if (dragicons[1]) {
    fileicons.removeChild(dragicons[1]);
  }
  dragicons[0].removeAttribute("style");
};

// Drag out request to electron
document.getElementById("drag").ondragstart = (event) => {
  event.preventDefault();
  const params = {
    filelist: filelist,
    instanceId: instanceId,
  };
  window.electron.dragOutListener(params);
  uploadArea.style.display = "flex";
  dragOutArea.style.display = "none";
  clearDrag();
};

// Close / Clear Button
document.querySelector(".close").addEventListener("click", () => {
  window.close();
});
