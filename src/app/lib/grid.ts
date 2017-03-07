import { setActiveGrid, activeGridCPNT, activeGrid } from '../globals';
import Grid from '../objects/grid';
import * as gridTypes from '../typings/grid';
import Button from '../objects/button';
import { renderButtons } from './button'
import render from './render';


export function initGrid(grid: Grid) {
    grid.isRoot = true;
    setActiveGrid(grid);
    render(grid);
}

export function loadGrid(grid: Grid) {
    if (!grid.isRoot) {
        grid.setParent(activeGrid);
    }
    setActiveGrid(grid);
    activeGridCPNT.setState({ buttons: renderButtons(grid.gridFormattedJSON.buttons)});
    console.log(activeGrid);
    
}

export function formatGrid(gridJSON: gridTypes.gridJSON): gridTypes.gridFormattedJSON {
    let gridFormattedJSON: gridTypes.gridFormattedJSON = <gridTypes.gridFormattedJSON>{
        // buttons: gridJSON.buttons.map((button) => { return new Button(button) }),
        buttons: []
    };
    gridJSON.buttons.forEach((button) => {
        gridFormattedJSON["buttons"].push(new Button(button))
    })
    return gridFormattedJSON;
}