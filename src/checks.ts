import * as configTypings from './typings/config';
import * as gridTypings from './typings/grid';
import * as buttonTypings from './typings/button';

export function checkConfig(config: configTypings.configJSON) {
    if (typeof config === 'undefined') {
        return "Requires a config.json file"
    }
    if (typeof config.rootGrid === 'undefined') {
        return "Requires rootGrid in config.json"
    } else {
        checkGrid(config.rootGrid);
    }

}

function checkGrid(grid: gridTypings.gridJSON) {

}

function checkButton(button: buttonTypings.buttonJSON) {

}