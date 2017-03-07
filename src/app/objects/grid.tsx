import * as React from 'react';
import * as gridTypes from "../typings/grid";
import GridCPNT from '../components/grid';
import Button from '../objects/button';
import ButtonCPNT from '../components/button';
import { formatGrid } from '../lib/grid';
import { loadGrid } from '../lib/grid';
import { hideWindow } from '../lib/window';


export default class Grid {
    gridJSON: gridTypes.gridJSON;
    gridFormattedJSON: gridTypes.gridFormattedJSON;
    parentGrid: Grid;
    isRoot: boolean;
    
    constructor(gridJSON: gridTypes.gridJSON) {
        this.gridJSON = gridJSON;
        this.gridFormattedJSON = formatGrid(gridJSON);
        this.isRoot = false;
    }

    setParent(grid: Grid) {
        this.parentGrid = grid;
    }
    
    back(hide = false) {
        if(!this.isRoot) {
            loadGrid(this.parentGrid);
        } else if (hide) {
            hideWindow();
        }
    }
}