import * as React from 'react';
import * as rootRequire from 'root-require';
import {Button, ButtonTypes} from './components/button';
import {loadGrid, Grid} from './grid';

interface Config {
    rootGrid: Grid;
    hotkey?: string;
}

// let config: Button = jsonfile.readFileSync("../config.json");

let config: Config = rootRequire("config.json");

loadGrid(config.rootGrid);
