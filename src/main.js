const electron = require('electron')

const { app,
        BrowserWindow,
        globalShortcut,
        ipcMain} = electron;

const config = require(require("app-root-path") + "/" + "config");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let width = 500;
let height = 500;


if(config.windowSize) {
    width = config.windowSize;
    height = config.windowSize;
}

function createWindow() {
    let screen = electron.screen;
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
    })

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    let key = 'Super+C';
    if (process.platform === "darwin") {
        key = 'Cmd+Ctrl+C';
    }
    if(config.hotkey) {
        key = config.hotkey;   
    }

    globalShortcut.register(key, () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.webContents.send("show", config);
            var pos = screen.getCursorScreenPoint();
            mainWindow.setPosition(pos.x - (mainWindow.getSize()[0]) / 2, pos.y - (mainWindow.getSize()[1]) / 2);
            mainWindow.show();
        }
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
    console.log("TEST");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipcMain.on("hide", function(event) {
    mainWindow.hide();
    return
});
