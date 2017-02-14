import * as React from 'react';
import * as rootRequire from 'root-require';
import {Button, ButtonTypes} from './components/button';
import {loadGrid, Grid} from './grid';
import {ipcRenderer} from 'electron';
let config: Config = rootRequire('config');


interface Config {
    rootGrid: Grid;
    hotkey?: string;
}


loadGrid(config.rootGrid);


// let config: Button = jsonfile.readFileSync("../config.json");



