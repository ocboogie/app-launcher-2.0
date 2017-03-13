import { homedir } from 'os';
import { resolve } from 'path';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';

import { dialog } from 'electron';
import * as gaze from 'gaze';
import * as chokidar from 'chokidar';

import { checkConfig } from './checkConfig';
import { displayError } from './error';
import defaultConfig from './defaultConfig';
import { deactivate, changeFolder, setMainLauncherWindow, watchingFolder } from './launcher';


const configDir = homedir();
const configPath = resolve(configDir, '.launcher.json');
let mainWindow: Electron.BrowserWindow;

export let config: Config.JSON;

export function setMainWindow(window: Electron.BrowserWindow) {
    mainWindow = window;
    setMainLauncherWindow(window);
}

function setConfig(_config: Config.JSON | null) {
    if (_config) {
        _config = {...defaultConfig, ..._config};
        console.log(`${watchingFolder}|${_config.launcherFolder}`);
        
        if ((_config && !_config.rootGrid) && watchingFolder !== _config.launcherFolder) {
            changeFolder(_config.launcherFolder);
            if (mainWindow) {
                mainWindow.webContents.send("reload folder changed");
            }
        } else if (_config && _config.rootGrid) {
            deactivate();
        }
        config = {..._config};
    } else {
        config = {...defaultConfig};
    }
}

function loadConfig(path: string) {
    let json = readFileSync(path, 'utf8');
    if (json) {
        let cfg = <Config.JSON>JSON.parse(json);
        let err = checkConfig(cfg);
        
        if (err) {
            displayError(`An error occurred loading your configuration (${configPath}): ${err}`);
            return false;
        } else {
            setConfig(cfg);
            return true;
        }
    } else {
        setConfig(null);
        return true;
    }
}

export function reloadConfig(path: string = configPath) {
    loadConfig(path);
    if (mainWindow) {
        mainWindow.webContents.send("config change");
    }
}

function watch(path: string) {
    chokidar.watch(path).on('change', () => {
        try {
            reloadConfig(path);
        } catch (err) {
            displayError(`An error occurred loading your configuration (${configPath}): ${err.message}`)
        }
    });
    // gaze(path, function(err: Error) {
    //     if (err) {
    //         throw err;
    //     }
    //     this.on('changed', () => {
    //         try {
    //             reloadConfig(path);
    //         } catch (err) {
    //             displayError(`An error occurred loading your configuration (${configPath}): ${err.message}`)
    //         }
    //     })
    // })
}

export function getConfig() {
    return config
}

export function init() {
    if (!existsSync(configPath)) {
        writeFileSync(configPath, "")
    }
    if (!loadConfig(configPath)) {
        setConfig(defaultConfig);
    }
    watch(configPath);
}