// import { nativeImage } from "electron";
// import { path } from path;

const { nativeImage } = require("electron");
const path = require("path");

let convertToNative = (imageName) => {
  return nativeImage.createFromPath(path.join("../media/", imageName));
};

let droppointDefaultIcon = convertToNative("droppoint.ico");
let droppointMacIcon = convertToNative("droppoint.icns");
let audio = convertToNative("audio.png");
let file = convertToNative("file.png");
let folder = convertToNative("folder.png");
let image = convertToNative("image.png");
let multifile = convertToNative("multifile.png");
let text = convertToNative("text.png");
let video = convertToNative("video.png");

// export {
//   droppointDefaultIcon,
//   droppointMacIcon,
//   audio,
//   file,
//   folder,
//   image,
//   multifile,
//   text,
//   video,
// };
