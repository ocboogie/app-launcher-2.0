import * as React from 'react';
import {Button, ButtonTypes} from './components/button';
import {formatConfig, Config, config} from './config';
import {loadGrid, Grid} from './grid';
import {ipcRenderer} from 'electron';

ipcRenderer.on("show", (event) => {
    loadGrid(config.rootGrid);
});
loadGrid(config.rootGrid);



// let config: Button = jsonfile.readFileSync("../config.json");



