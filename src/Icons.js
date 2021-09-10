const path = require("path");

let convertToNative = (imageName) => {
  let icon = path.join(__dirname, "../static/media/", imageName);
  return icon;
};

let droppointDefaultIcon =
  process.platform !== "linux"
    ? convertToNative("droppoint.ico")
    : convertToNative("pngLogo/droppoint-1.png");
let droppointMacIcon = convertToNative("droppoint.icns");
let audio = convertToNative("audio.png");
let file = convertToNative("file.png");
let folder = convertToNative("folder.png");
let image = convertToNative("image.png");
let multifile = convertToNative("multifile.png");
let text = convertToNative("text.png");
let video = convertToNative("video.png");

module.exports = {
  droppointDefaultIcon: droppointDefaultIcon,
  droppointMacIcon: droppointMacIcon,
  audio: audio,
  file: file,
  folder: folder,
  image: image,
  multifile: multifile,
  text: text,
  video: video,
};
