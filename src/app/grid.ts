import * as React from 'react';
import {renderGrid} from './render';
import GridCPNT from './components/GridCPNT';
import {Button} from './components/Button';
import * as fs from 'fs';
import * as path from 'path';
import {config} from './config';


export var activeGrid: Grid;

export interface Properties {
    root: Boolean;
    parent?: Grid;
}

export interface Grid {
    buttons: Button[];
    colors?: string[];
    style?: React.CSSProperties;
    properties: Properties;
};

export function formatGrid(grid: Grid): Grid {
    grid.properties = {root: false};
    grid.buttons.forEach((button) => {
        switch (button.type) {
            case "grid":
                button.value = formatGrid(<Grid>button.value);
                break;
            case "long folder":
                button.type = "grid";
                button.value = formatGrid(dir2GridRecursive(<string>button.value));
                break;
            case "short folder":
                button.type = "grid";
                button.value = formatGrid(dir2Grid(<string>button.value));
                break;
        }

    });
    return grid;
}

export function gridBack(): void {
    if (activeGrid.properties.parent) {
        loadGrid(activeGrid.properties.parent);
    }
}

export function loadGrid(grid: Grid): void {
    setActiveGrid(grid);
    renderGrid(grid);
    console.log(grid);
};


export function setActiveGrid(grid: Grid) {
    activeGrid = grid;
}

export function dir2Grid(folderPath: string): Grid {
    let dir = fs.readdirSync(folderPath);
    let grid: Grid = {buttons: [], properties: undefined};
    dir.forEach((file: string) => {
        if(!fs.lstatSync(`${folderPath}/${file}`).isDirectory()) {
            let button: Button = {text: path.basename(file, path.extname(file)), type: "app", value: ""};
            button.value = `${folderPath}/${file}`;
            grid.buttons.push(button);
        }
    });
    return grid;
}

export function dir2GridRecursive(folderPath: string): Grid {
    let dir = fs.readdirSync(folderPath);
    if(!config.showHidden || (typeof config.showHidden === 'boolean' && !config.showHidden)) {
        dir = dir.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    }
    let grid: Grid = {buttons: [], properties: undefined};
    dir.forEach((file: string) => {
        let button: Button = {text: path.basename(file, path.extname(file)), type: "app", value: ""};
        if(fs.lstatSync(`${folderPath}/${file}`).isDirectory() && path.extname(file) !== ".app") {
            button.type = "grid";
            button.value = dir2GridRecursive(`${folderPath}/${file}`);
        } else {
            button.value = `${folderPath}/${file}`;
        }
        grid.buttons.push(button);
    });
    return grid;
}
