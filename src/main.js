const electron = require('electron')

const { app,
        BrowserWindow,
        globalShortcut,
        ipcMain} = electron;

const electronLocalshortcut = require('electron-localshortcut');

const config = require(require("app-root-path") + "/" + "config");
const checks = require("./checks")

let error = checks.checkConfig(config);

console.log(error)

let mainWindow
let width = 500;
let height = 500;

if(config.windowSize) {
    width = config.windowSize;
    height = config.windowSize;
}

function toggleHide() {
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

function createMainWindow() {
    if (error) {
        loadError()
    } else {
        loadLauncher()
    }
}

function loadLauncher() {
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

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

function loadError() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 500,
    })
    mainWindow.loadURL(`file://${__dirname}/error.html`)
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
