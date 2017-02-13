import * as React from 'react';
import * as rootRequire from 'root-require';
import {Button, ButtonTypes} from './components/button';
import {loadGrid, Grid} from './grid';

// let config: Button = jsonfile.readFileSync("../config.json");

let config: Grid = rootRequire("config.json");

loadGrid(config);
