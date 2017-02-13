import * as React from 'react';
import render from './render';
import GridCPNT from './components/GridCPNT';
import {Button} from './components/Button'

export var activeGrid: Grid | null = null;

export interface Grid {
    buttons: Button[];
    parent?: Grid;
    colors?: string[];

};

export function goBack(): void {
    if (activeGrid.parent) {
        loadGrid(activeGrid.parent);
    }
}

export function loadGrid(grid: Grid): void {
    if (activeGrid) {
        grid.parent = activeGrid;
    }
    setActiveGrid(grid);
    render(grid);
};


export function setActiveGrid(grid: Grid | null) {
    activeGrid = grid;
}
