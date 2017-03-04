import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as appRoot from 'app-root-path';
import {renderError} from './render';
import Error from './components/error';
import {Button, ButtonTypes} from './button';
import {formatConfig, Config, config, initConfig} from './config';
import {loadGrid, Grid, dir2GridRecursive} from './grid';
import {ipcRenderer, webFrame} from 'electron';
import keyyGen from './lib/keyGen';

require("./keyboardClick");

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

ipcRenderer.on("show", (event) => {
    loadGrid(config.rootGrid);
});
initConfig();
loadGrid(config.rootGrid);



// let config: Button = jsonfile.readFileSync("../config.json");



