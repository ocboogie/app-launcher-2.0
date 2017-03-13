import * as fs from 'fs';
import * as path from 'path';

import { formatButton } from './button';
import { getConfig } from '../config';

export function formatGrid(grid: Grid.JSON, root: boolean = true) {
    let gridFormatted: Grid.formattedJSON = <Grid.formattedJSON>{ ...grid };
    grid.buttons.forEach((button, id) => {
        gridFormatted.buttons[id] = formatButton(button);
    });
    gridFormatted.isRoot = root;
    return gridFormatted;
}

export function findRoot(grid: Grid.formattedJSON): Grid.formattedJSON {
    if (grid.isRoot) {
        return grid
    } else {
        return findRoot(grid.parent)
    }
}

export const extensions: { [id: string]: Function; } = {
    "web": (fileName: string, folderPath: string, button: Button.formattedJSON): Button.formattedJSON => {
        button.type = "url";
        button.value = fs.readFileSync(`${folderPath}/${fileName}`, "utf8")
        return button;
    }
}

export function dir2Grid(folderPath: string): Grid.formattedJSON {
    let dir = fs.readdirSync(folderPath);
    let grid: Grid.formattedJSON = <Grid.formattedJSON>{ buttons: [] };
    dir.forEach((file: string) => {
        let button: Button.formattedJSON = { text: path.basename(file, path.extname(file)), type: "app", value: "" };
        if (!(fs.statSync(`${folderPath}/${file}`).isDirectory())) {
            if (Object.keys(extensions).indexOf(path.extname(file).slice(1)) > -1) {
                Object.assign(button, extensions[path.extname(file).slice(1)](file, folderPath, button));
            } else {
                button.value = `${folderPath}/${file}`;
            }
        } else if (Object.keys(extensions).indexOf(path.extname(file).slice(1)) > -1) {
        }
        grid.buttons.push(button);
    });
    return grid;
}

export function dir2GridRecursive(folderPath: string, root=true): Grid.formattedJSON {
    let config = getConfig();
    let dir = fs.readdirSync(folderPath);
    if (!config.showHidden || (typeof config.showHidden === 'boolean' && !config.showHidden)) {
        dir = dir.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    }
    let grid: Grid.formattedJSON = <Grid.formattedJSON>{ buttons: [], isRoot: root };
    dir.forEach((file: string) => {
        let button: Button.formattedJSON = { text: path.basename(file, path.extname(file)), type: "app", value: "" };
        if (fs.statSync(`${folderPath}/${file}`).isDirectory() && path.extname(file) !== ".app") {
            button.type = "grid";
            button.value = dir2GridRecursive(`${folderPath}/${file}`, false);
        } else {
            if (Object.keys(extensions).indexOf(path.extname(file).slice(1)) > -1) {
                Object.assign(button, extensions[path.extname(file).slice(1)](file, folderPath, button));
            } else {
                button.value = `${folderPath}/${file}`;
            }
        }
        grid.buttons.push(button);
    });
    return grid;
}