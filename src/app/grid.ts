import * as React from 'react';
import {renderGrid} from './render';
import GridCPNT from './components/GridCPNT';
import {Button} from './components/Button';
import * as fs from 'fs';


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

export function dir2Grid(path: string): Grid {
    let dir = fs.readdirSync(path);
    let grid: Grid = {buttons: [], properties: undefined};
    dir.forEach((file: string) => {
        if(!fs.lstatSync(`${path}/${file}`).isDirectory()) {
            let button: Button = {text: file, type: "app", value: ""};
            button.value = `${path}/${file}`;
            grid.buttons.push(button);
        }
    });
    return grid;
}

export function dir2GridRecursive(path: string): Grid {
    let dir = fs.readdirSync(path);
    let grid: Grid = {buttons: [], properties: undefined};
    dir.forEach((file: string) => {
        let button: Button = {text: file, type: "app", value: ""};
        if(fs.lstatSync(`${path}/${file}`).isDirectory()) {
            button.type = "grid";
            button.value = dir2GridRecursive(`${path}/${file}`);
        } else {
            button.value = `${path}/${file}`;
        }
        grid.buttons.push(button);
    });
    return grid;
}
