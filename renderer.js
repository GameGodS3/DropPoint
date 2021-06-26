let filepath;
let filetype;
let filelist = [];
let holder = document.getElementById("droppoint");
let dragin = document.getElementsByClassName("upload")[0];
let dragout = document.getElementById("drag");

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
        document.querySelector("#drag img").src = "file.png";
        filetype = "application";
      } else if (filetype != "application") {
        document.querySelector("#drag img").src = filetype + ".png";
      } else {
        document.querySelector("#drag img").src = "file.png";
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
    console.log(filelist);
    return false;
  };
})();

// Drag out request to electron
document.getElementById("drag").ondragstart = (event) => {
  event.preventDefault();
  window.electron.startDrag(filepath, filetype);
  dragin.style.display = "flex";
  dragout.style.display = "none";
};

// Close/clear button
document.querySelector(".close").addEventListener("click", (e) => {
  e.preventDefault();
  filelist = [];
  window.electron.minimise();
  dragin.style.display = "flex";
  dragout.style.display = "none";
});
