export function initGrid(grid: Grid.formattedJSON): Action {
    return {
        "type": "GRID_INIT",
        "payload": grid
    }
}

export function loadGrid(grid: Grid.formattedJSON): Action {
    return {
        "type": "GRID_LOAD",
        "payload": grid
    }
}

export function reloadGrid(grid: Grid.formattedJSON): Action {
    return {
        "type": "GRID_RELOAD",
        "payload": grid
    }
}

export function backGrid(): Action {
    return {
        "type": "GRID_BACK",
        "payload": null
    }
}

export function rootGrid(): Action {
    return {
        "type": "GRID_ROOT",
        "payload": null
    }
}