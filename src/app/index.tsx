import * as React from 'react';
import * as appRoot from 'app-root-path';
import {Button, ButtonTypes} from './components/button';
import {formatConfig, Config, config, initConfig} from './config';
import {loadGrid, Grid, dir2GridRecursive} from './grid';
import {ipcRenderer} from 'electron';

initConfig();

ipcRenderer.on("show", (event) => {
    loadGrid(config.rootGrid);
});
loadGrid(config.rootGrid);



// let config: Button = jsonfile.readFileSync("../config.json");



