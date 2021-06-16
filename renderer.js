var filepath;

(function () {
  var holder = document.getElementById("droppoint");
  var dragin = document.getElementsByClassName("upload")[0];
  var dragout = document.getElementById("drag");
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
  holder.ondrop = (e) => {
    e.preventDefault();
    holder.removeAttribute("class");
    for (let f of e.dataTransfer.files) {
      console.log("Files dragged: ", f.path);
      filepath = f.path.toString();
      dragin.style.display = "none";
      dragout.style.display = "flex";
    }
    return false;
  };
})();

document.getElementById("drag").ondragstart = (event) => {
  event.preventDefault();
  window.electron.startDrag(filepath);
};
