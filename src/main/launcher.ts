import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';

import { resolve } from 'path';

import * as chokidar from 'chokidar';

import { displayError } from './error';

let launcherFolder: any = null;
export let watchingFolder: string = null;
let mainWindow: Electron.BrowserWindow = null;

function watch(path: string) {
    watchingFolder = path;
    if (launcherFolder) {
        launcherFolder.close();
    }
    launcherFolder = chokidar.watch(resolve(path, "**/*"));
    launcherFolder.on('all', () => {
        if (mainWindow) {
            mainWindow.webContents.send("reload folder changed");
        }
    });
    launcherFolder.on('error', (error: any) => { mainWindow.webContents.send("reload folder changed"); watch(path) })
}

export function setMainLauncherWindow(_mainWindow: Electron.BrowserWindow) {
    mainWindow = _mainWindow;
}

export function changeFolder(path: string) {
    if (!existsSync(path)) {
        mkdirSync(path);
    }
    watch(path);
}

export function deactivate() {
    if (launcherFolder) {
        launcherFolder.close();
    }
}
