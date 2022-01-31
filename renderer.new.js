// const holder = document.getElementById("droppoint");

// holder.ondragover = (e) => {
//   e.preventDefault;
//   e.stopPropagation;
//   holder.setAttribute("class", "dragged");
//   return false;
// };
// holder.ondragenter = (e) => {
//   e.preventDefault;
//   e.stopPropagation;
//   holder.setAttribute("class", "dragged");
//   return false;
// };
// holder.ondragleave = (e) => {
//   e.preventDefault;
//   e.stopPropagation;
//   holder.removeAttribute("class");
//   return false;
// };

// holder.ondragend = (e) => {
//   e.preventDefault;
//   e.stopPropagation;
//   holder.removeAttribute("class");
//   return false;
// };

// File List which will contain list of dicts
// in the format {filename:"filename", filepath:"file/path"}
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

const filetypes = ["audio", "image", "video", "text", "file"];

// Testing by growing the file list
let growfilelist = () => {
  filelist.push({
    fileName: "TestFile",
    fileType: filetypes[Math.floor(Math.random() * filetypes.length)],
  });
  console.log(filelist);
};

// UI image elements
const imageHolder = document.querySelectorAll("#droppoint img");

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
}

let fq = new FileQueueUI();
// for (let i = 0; i < imageHolder.length; i++) {
//   const element = imageHolder[i];
//   fq.enqueue(filetypes[Math.floor(Math.random() * filetypes.length)]);
// }

document.addEventListener("file-push", () => {
  console.log("File Pushed");
  fq.enqueue(filelist[filelist.length - 1].fileType);
  for (let i = 0; i < imageHolder.length; i++) {
    imageHolder[i].src = "./static/media/" + fq.front() + ".png";
  }
});
if (filelist.length == 0) {
  imageHolder[0].src = "./static/media/upload.png";
}
