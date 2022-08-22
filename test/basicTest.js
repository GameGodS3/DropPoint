const ihk = require("iohook2");
const robot = require("robotjs");

ihk.start();
robot.setMouseDelay(50);

console.log("Test running");
const moveMouse = () => {
  let mousePos = robot.getMousePos();
  console.log(mousePos);
  let newPos = { x: mousePos.x, y: mousePos.y + 200 };
  robot.moveMouseSmooth(newPos.x, newPos.y);
  robot.mouseToggle("down");
  robot.moveMouseSmooth(100, 100);
  robot.mouseToggle("up");
  robot.moveMouseSmooth(100, 100);
  robot.mouseToggle("down");
  robot.moveMouseSmooth(mousePos.x, mousePos.y);
  robot.mouseToggle("up");
};

ihk.on("keydown", (e) => {
  if (e.key == "rightCtrl") {
    console.log("Started");
    moveMouse();
  }
});
