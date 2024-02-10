import { app, BrowserWindow } from "electron";
import * as path from "path";
import { autoUpdater } from 'electron-updater';
// import * as sqlite3 from "sqlite3"
// import * as permissions from "node-mac-permissions";
// import * as argon from 'argon2'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  // if (process.env.NODE_ENV !== 'production') {
    const log = require("electron-log")
    log.transports.file.level = "debug"
    autoUpdater.logger = log
  // }

  autoUpdater.addListener('update-downloaded', () => {
    autoUpdater.quitAndInstall()
  })
  // autoUpdater.addAuthHeader(`Bearer ${license?.attributes?.metadata?.token ?? ''}`)
  // autoUpdater.checkForUpdatesAndNotify({
  //   body: 'hellooooo. there is an update',
  //   title: "hell yeah"
  // })


  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // const db = new sqlite3.Database('temp.db')
  // console.log('status:', permissions.getAuthStatus('accessibility'))
  // argon
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
