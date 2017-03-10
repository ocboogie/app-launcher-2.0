import { formatButton } from './button';

export function formatGrid(grid: Grid.JSON, root: boolean = true) {
    let gridFormatted: Grid.formattedJSON = <Grid.formattedJSON>{...grid};
    grid.buttons.forEach((button, id) => {
        gridFormatted.buttons[id] = formatButton(button);
    })
    gridFormatted.isRoot = root;
    return gridFormatted;
}

export function findRoot(grid: Grid.formattedJSON): Grid.formattedJSON {
    if (grid.isRoot) {
        return grid;
    } else {
        return findRoot(grid.parent);
    }
}