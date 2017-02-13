import * as React from 'react';
import render from './render';
import {Grid} from './components/grid';
import {setActiveGrid} from './activeGrid';


export default function loadGrid(grid: Grid): void {
    setActiveGrid(grid);
    render(grid);
};
