const { app, BrowserWindow } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) return;
require("update-electron-app")();

//const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

function createMainWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: "weatherIcon.ico",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Show devtools automatically if in development
  // if (isDev) {
  //   win.webContents.openDevTools();
  // }

  // Load a URL into the window.
  win.loadFile("renderer/index.html");
}

app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
