const path = require("path");
const { nativeTheme } = require("electron");

/**
 * Adds static folder path to image name
 *
 * @param {String} imageName
 * @returns {String}
 */
const joinStaticPath = (imageName) =>
  path.join(__dirname, "../static/media/", imageName);

const icons = {
  droppointDefaultIcon:
    process.platform !== "win32"
      ? process.platform === "darwin"
        ? nativeTheme.shouldUseDarkColors
          ? joinStaticPath("pngLogo/droppointMacDarkTemplate.png")
          : joinStaticPath("pngLogo/droppointMacTemplate.png")
        : joinStaticPath("pngLogo/droppoint.png")
      : joinStaticPath("droppoint.ico"),
  audio: joinStaticPath("audio.png"),
  file: joinStaticPath("file.png"),
  folder: joinStaticPath("folder.png"),
  image: joinStaticPath("image.png"),
  multifile: joinStaticPath("multifile.png"),
  text: joinStaticPath("text.png"),
  video: joinStaticPath("video.png"),
};

module.exports = icons;
