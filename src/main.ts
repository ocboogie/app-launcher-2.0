import * as electron from 'electron';
import * as electronLocalshortcut from 'electron-localshortcut';
import { checkConfig } from './checks';

const { app,
        BrowserWindow,
        globalShortcut,
        ipcMain} = electron;

require('electron-reload')(__dirname);
const config = require(require("app-root-path") + "/" + "config");

let error = checkConfig(config);

let mainWindow: Electron.BrowserWindow;
let width: number = 500;
let height: number = 500;

if(config.windowSize) {
    width = config.windowSize;
    height = config.windowSize;
}

function toggleHide(): void {
    let screen = electron.screen;
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        mainWindow.webContents.send("show", config);
        var pos = screen.getCursorScreenPoint();
        mainWindow.setPosition(pos.x - (mainWindow.getSize()[0]) / 2, pos.y - (mainWindow.getSize()[1]) / 2);
        mainWindow.show();
    }
}

function createMainWindow(): void {
    if (error) {
        loadError()
    } else {
        loadLauncher()
    }
}

function loadLauncher(): void {
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
    })

    mainWindow.loadURL(`file://${__dirname}/views/index.html`)

    mainWindow.webContents.openDevTools()
    let key = 'Super+C';
    if (process.platform === "darwin") {
        key = 'Cmd+Ctrl+C';
    }
    if (config.hotkey) {
        key = config.hotkey;
    }

    globalShortcut.register(key, () => {
        toggleHide()
    });

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

function loadError(): void {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 500,
    })
    mainWindow.loadURL(`file://${__dirname}/views/error.html`)
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createMainWindow)
ipcMain.on("loaded", function(event) {
    mainWindow.webContents.send("error", error)
});
ipcMain.on("hide", function(event) {
    mainWindow.hide();
    return
});
ipcMain.on("restart", function() {
    app.relaunch()
    app.quit()
})

