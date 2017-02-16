import {Grid, formatGrid} from './grid';
import * as rootRequire from 'root-require';

export let config: Config = rootRequire('config');

config = formatConfig(config);

export interface Config {
    rootGrid: Grid;
    hotkey?: string;
    colors?: String[];
    windowsSize?: number;
}

export function formatConfig(config: Config): Config {
    config.rootGrid = formatGrid(config.rootGrid);
    config.rootGrid.properties.root = true;
    return config;
}

