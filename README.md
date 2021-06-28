<p align="center">

![DropPoint](https://socialify.git.ci/GameGodS3/DropPoint/image?description=1&logo=https%3A%2F%2Fgithub.com%2FGameGodS3%2FDropPoint%2Fblob%2Fmain%2Fmedia%2Fico%2Fdroppoint.ico%3Fraw%3Dtrue&owner=1&theme=Light)

[![GitHub license](https://img.shields.io/github/license/GameGodS3/DropPoint?style=flat-square)](https://github.com/GameGodS3/DropPoint/blob/main/LICENSE)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/GameGodS3/DropPoint/Build?style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/GameGodS3/DropPoint?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/GameGodS3/DropPoint?color=yellow&style=flat-square)

[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FGameGodS3%2FDropPoint)](https://twitter.com/intent/tweet?text=Checkout%20this%20cool%20project!&url=https%3A%2F%2Fgithub.com%2FGameGodS3%2FDropPoint)

</p>

Make drag-and-drop easier using DropPoint!

DropPoint helps you drag content without having to open side-by-side windows

Works on **Windows**, **Linux** and **MacOS**.

Follows Fluent design style to match Windows 11 aesthetics :)

## :sparkles: Demo

### Across maximized windows in the same desktop

![Drag between windows](https://i.imgur.com/QkUPoOb.gif)

### Across windows in different virtual desktops/workspaces

![Drag between desktops](https://i.imgur.com/WElktc0.gif)

## :package: Official Releases

Go to the [Releases Page](https://github.com/GameGodS3/DropPoint/releases) to download the latest releases

- Windows
  - Download `DropPoint-1.x.x-win.zip` from Releases and extract to a blank folder. Run `DropPoint.exe`.
  - To enable stickyness across Virtual Desktops (Windows) go to Task view while DropPoint is running, right click it and tick **"Show Window from this app on all Desktops"**. Stickyness in other Operating Systems works by default.
- Mac
  - Download `DropPoint-1.x.x.dmg` from Releases and install. Open "System Preferences > Security & Privacy > Open Anyway"
  - Or Download `DropPoint-1.x.x-mac.zip` from Releases and extract to a blank folder. Run `DropPoint.app`. Open "System Preferences > Security & Privacy > Open Anyway"
- Linux
  - All Linux Distros: Download `DropPoint-1.x.x.AppImage` to run.
  - Debian-based Distros (Ubuntu, Mint, PopOs, etc): Download `droppoint_1.x.x_amd64.deb`.
  - Arch-based Distros (Manjaro, Arch, etc.): Download `droppoint-1.x.x.tar.gz`
  - RHEL-based Distros (Fedora, Red Hat, etc): Download `droppoint-1.x.x.x86_64.rpm`.

## :v: Usage

- Drag and drop any file(s) or folder from the system into DropPoint, go to your desired location and drag it out.

- App minimises to tray by default when you close the instance. To open instance, click on system tray. To quit, right click on tray icon > Quit.
- While DropPoint is in the system tray, pressing **Shift + Caps Lock** anywhere in you PC would toggle an instance of DropPoint. (as tested on Windows)

## :gear: Developer Installation

**You must have NPM and Git installed in your PC**

1. Clone repo and change into directory
   ```bash
   git clone https://github.com/GameGodS3/DropPoint.git
   cd DropPoint
   ```
2. Install dependencies and run
   ```bash
    npm install
    npm start
   ```

**_Contributions are welcome!_**

## :heart: Credits

- Huge thanks to [Ajay Krishna KV](https://github.com/AJAYK-01) for CI/CD and Releases
- Fluent icons from [Icons8](https://icons8.com)

## Related

- Project inspired from [Dropover app](http://dropoverapp.com) in MacOS
- For a more feature-rich, Linux friendly and GTK-based alternative, checkout [PyDrop](https://github.com/Roshan-R/PyDrop)
