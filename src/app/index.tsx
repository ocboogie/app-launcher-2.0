import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as appRoot from 'app-root-path';
import {renderError} from './render';
import Error from './components/error';
import {Button, ButtonTypes} from './components/button';
import {formatConfig, Config, config, initConfig} from './config';
import {loadGrid, Grid, dir2GridRecursive} from './grid';
import {ipcRenderer} from 'electron';

ipcRenderer.on("show", (event) => {
    loadGrid(config.rootGrid);
});
initConfig();
loadGrid(config.rootGrid);



// let config: Button = jsonfile.readFileSync("../config.json");



