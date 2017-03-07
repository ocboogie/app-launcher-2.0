import Config from './objects/config';
import * as gridTypes from './typings/grid';
import Grid from './objects/grid';
import GridCPNT from './components/grid';


export let activeConfig: Config;
export function setActiveConfig(config: Config) {
    activeConfig = config;
}

export let activeGridCPNT: GridCPNT; 
export function setActiveGridCPNT(gridCPNT: GridCPNT) {
    activeGridCPNT = gridCPNT;
}

export let activeGrid: Grid;
export function setActiveGrid(grid: Grid) {
    activeGrid = grid;
}