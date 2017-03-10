import { join } from 'path';

import * as electron from 'electron';
import * as electronLocalshortcut from 'electron-localshortcut';

import * as config from './config';

const { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray } = electron;


require('electron-reload')(__dirname);

let tray: Electron.Tray;
let mainWindow: Electron.BrowserWindow;

config.init();

function toggleHide(): void {
    let screen = electron.screen;
    if (mainWindow.isVisible()) {
        mainWindow.hide();
        mainWindow.webContents.send("hide");
    } else {
        mainWindow.webContents.send("show");
        var pos = screen.getCursorScreenPoint();
        mainWindow.setPosition(Math.round(pos.x - (mainWindow.getSize()[0]) / 2), Math.round(pos.y - (mainWindow.getSize()[1]) / 2));
        mainWindow.show();
    }
}

app.on('ready', () => {
    tray = new Tray(join(__dirname, "../../assets/tray.png"));
    const contextMenu = Menu.buildFromTemplate([
        {
            role: 'quit'
        }
    ])
    tray.setToolTip('App launcher')
    tray.setContextMenu(contextMenu)
    mainWindow = new BrowserWindow({
        width: config.config.windowSize,
        height: config.config.windowSize,
        alwaysOnTop: config.config.alwaysOnTop,
        transparent: true,
        frame: false,
    })
    if(process.platform === "darwin") {
        app.dock.hide();
    } else {
        mainWindow.setSkipTaskbar(true);
    }
    mainWindow.loadURL(`file://${__dirname}/../index.html`)

    if (config.config.debug) {
        mainWindow.webContents.openDevTools()
    }

    globalShortcut.register(config.config.hotkey, () => {
        toggleHide()
    });

    mainWindow.on('closed', function () {
        mainWindow = null
    })
    config.setMainWindow(mainWindow);
});
ipcMain.on("hide window", function(event) {
    mainWindow.hide();
});
ipcMain.on("show window", function(event) {
    mainWindow.show();
})


