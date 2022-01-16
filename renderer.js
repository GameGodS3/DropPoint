let filepath;
let filetype;
let filelist = [];
const holder = document.getElementById("droppoint");
const dragin = document.getElementsByClassName("upload")[0];
const dragout = document.getElementById("drag");
const fileicons = document.querySelector(".file-icon");
const dragicons = document.getElementsByClassName("files");
const instanceId = parseInt(globalThis.location.search.substring(4));

console.log("Instance ID: " + instanceId);

function clearDrag() {
  filelist = [];
  if (dragicons[2]) {
    fileicons.removeChild(dragicons[2]);
  }
  if (dragicons[1]) {
    fileicons.removeChild(dragicons[1]);
  }
  dragicons[0].removeAttribute("style");
}

(function () {
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
  // Assigns filetype and filepath in this function
  holder.ondrop = (e) => {
    e.preventDefault();
    holder.removeAttribute("class");
    for (let f of e.dataTransfer.files) {
      console.log("Files dragged: ", f.path);
      filetype = f.type.split("/")[0];
      fileExtension = f.type.split("/")[1];
      console.log(filetype);

      // For checking if it's a file or folder
      if (f.name.includes(".")) {
        console.log(f.name.split(".")[f.name.split(".").length - 1]);
      }
      // If the filetype does not belong to the available JavaScript filetypes
      if (filetype === "") {
        document.querySelector("#drag img").src = "./media/file.png";
        filetype = "application";
      } else if (filetype !== "application") {
        document.querySelector("#drag img").src = `./media/${filetype}.png`;
      } else {
        document.querySelector("#drag img").src = "./media/file.png";
      }
      filepath = f.path.toString();
      let filedict = {
        filePath: filepath,
        fileType: filetype,
      };
      filelist.push(filedict);
      dragin.style.display = "none";
      dragout.style.display = "flex";
    }
    document.getElementsByTagName("num")[0].innerHTML = filelist.length;
    console.log(filelist);

    // Animations for multiple file input
    dragicons = document.getElementsByClassName("files");
    if (filelist.length === 2) {
      dragicons[0].src = "./media/file.png";
      let newimg = document.createElement("img");
      newimg.src = "./media/file.png";
      newimg.className = "files";
      fileicons.appendChild(newimg);
      dragicons[0].style = "animation: tilt 0.5s forwards";
      newimg.style = "filter: drop-shadow(3px 3px 5px #0a0a0942);";
    } else if (filelist.length > 2) {
      dragicons[0].src = "./media/file.png";
      // ProtoImg and NewImg are required in case user drags in more than 2 files initially itself
      let protoimg = document.createElement("img");
      protoimg.src = "./media/file.png";
      protoimg.className = "files";
      fileicons.appendChild(protoimg);
      let newimg = document.createElement("img");
      newimg.src = "./media/file.png";
      newimg.className = "files";
      fileicons.appendChild(newimg);
      dragicons[0].style = "animation: tiltmore 0.5s forwards";
      protoimg.style =
        "animation: tilt 0.5s forwards; filter: drop-shadow(3px 3px 5px #0a0a0942);";
      newimg.style = "filter: drop-shadow(3px 3px 5px #0a0a0942);";
    }
    return false;
  };
})();

// Drag out request to electron
document.getElementById("drag").ondragstart = (event) => {
  event.preventDefault();
  const params = {
    filelist: filelist,
    instanceId: instanceId,
  };
  window.electron.dragOutListener(params);
  dragin.style.display = "flex";
  dragout.style.display = "none";
  clearDrag();
};

// Close/clear button
document.querySelector(".close").addEventListener("click", (e) => {
  e.preventDefault();
  clearDrag();
  window.electron.minimise();
  dragin.style.display = "flex";
  dragout.style.display = "none";
});
