import * as React from 'react';
import render from './render';
import GridCPNT from './components/GridCPNT';
import {Button} from './components/Button'

export var activeGrid: Grid;

export interface Properties {
    root: Boolean;
}

export interface Grid {
    buttons: Button[];
    parent?: Grid;
    colors?: string[];
    properties?: Properties;
};

export function formatGrid(grid: Grid): Grid {
    grid.properties = {root: false};
    grid.buttons.forEach((button) => {
        if(button.type === "grid") {
            formatGrid(<Grid>button.value);
        }
    });
    return grid;
}

export function gridBack(): void {
    if (activeGrid.parent) {
        loadGrid(activeGrid.parent);
    }
}

export function loadGrid(grid: Grid): void {
    setActiveGrid(grid);
    render(grid);
    console.log(grid);
};


export function setActiveGrid(grid: Grid) {
    activeGrid = grid;
}
