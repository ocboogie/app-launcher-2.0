import {Grid} from './components/grid';

export var activeGrid: Grid | null = null;

export function setActiveGrid(grid: Grid | null) {
    activeGrid = grid;
}
