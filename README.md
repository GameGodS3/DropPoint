# DropPoint

Drag-and-Drop Assist

Make dragging and dropping across windows and virtual desktops/workspaces easier using DropPoint!

DropPoint holds your file/folder temporarily so that you may navigate to a folder of your choice and drop it there.

Works on Windows, Linux and MacOS

## Demo

### Across maximized windows in the same desktop

## ![Drag between windows](./demo1.gif)

### Across windows in different virtual desktops/workspaces

![Drag between windows](./demo2.gif)

## Installation & Usage

**You must have NPM installed in your PC**

1. Clone repo and change into directory
   ```bash
   git clone https://github.com/GameGodS3/DropPoint.git
   cd DropPoint
   ```
2. Install dependencies and run
   ```bash
    npm install
    npm run
   ```
   To enable stickyness across Virtual Desktops (Windows) go to Task view while DropPoint is running, right click it and tick "Show Window from this app on all Desktops". Stickyness in other OS under development.

**Optional:** Although there are no official binary releases as of now, you may build your own by executing:

```bash
npm run build-win32 # for Windows
npm run build-linux # for Linux
npm run build-mac # for MacOS
npm run build-all # for Windows, MacOS and Linux
```

##### Binary build has only been tested in Windows. Once testing is complete in all three OSs, releases shall be published

## Related

- Project inspired from [Dropover app](http://dropoverapp.com) in MacOS
- For a more feature-rich, Linux friendly and GTK-based alternative, checkout [PyDrop](https://github.com/Roshan-R/PyDrop)
