const path = require("path");

const convertToNative = (imageName) =>
  path.join(__dirname, "../static/media/", imageName);

const icons = {
  droppointDefaultIcon:
    process.platform !== "win32"
      ? convertToNative("pngLogo/droppoint.png")
      : convertToNative("droppoint.ico"),
  audio: convertToNative("audio.png"),
  file: convertToNative("file.png"),
  folder: convertToNative("folder.png"),
  image: convertToNative("image.png"),
  multifile: convertToNative("multifile.png"),
  text: convertToNative("text.png"),
  video: convertToNative("video.png"),
};

module.exports = icons;
