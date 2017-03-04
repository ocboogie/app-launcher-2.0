import {Grid, formatGrid, dir2GridRecursive} from './grid';
import {renderError} from './render';
import { changeKeys} from './lib/keyGen';
import * as appRoot from 'app-root-path';

export let config: Config;

export interface Config {
    rootGrid?: Grid;
    hotkey?: string;
    colors?: string[];
    windowsSize?: number;
    folderPath?: string;
    style?: React.CSSProperties;
    hideFocus?: boolean;
    showHidden?: boolean;
    highlightColor?: string;
    keycodeKeys?: string;
}

export function initConfig() {
    config = require(appRoot + "/config");  
    // checkConfig(config);
    config = formatConfig(config);
    if (config.keycodeKeys) {
        changeKeys(config.keycodeKeys);
    }
    
}

export function formatConfig(config: Config): Config {
    // dir2GridRecursive(config.folderPath)
    if(config.folderPath) {
        config.rootGrid = formatGrid((dir2GridRecursive(appRoot + "/" + config.folderPath)));
    } else {
        config.rootGrid = formatGrid(config.rootGrid);
    }
    config.rootGrid.properties.root = true;
    return config;
}

// export function checkConfig(config: Config): void {
//     console.log(typeof config.rootGrid ===);
// }

