const path = require("path");

const convertToNative = (imageName) =>
  path.join(__dirname, "../static/media/", imageName);

const icons = {
  droppointDefaultIcon:
    process.platform !== "linux"
      ? process.platform === "darwin"
        ? convertToNative("droppoint.icns")
        : convertToNative("droppoint.ico")
      : convertToNative("pngLogo/droppoint.png"),
  audio: convertToNative("audio.png"),
  file: convertToNative("file.png"),
  folder: convertToNative("folder.png"),
  image: convertToNative("image.png"),
  multifile: convertToNative("multifile.png"),
  text: convertToNative("text.png"),
  video: convertToNative("video.png"),
};

module.exports = icons;
