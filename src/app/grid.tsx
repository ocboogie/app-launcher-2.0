import * as React from 'react';
import {renderGrid} from './render';
import GridCPNT from './components/gridCPNT';
import ButtonCPNT from './components/buttonCPNT';
import {Button, setActiveButtonCPNTs} from './button';
import * as fs from 'fs';
import * as path from 'path';
import {config} from './config';
import keyGen from './lib/keyGen';

export var activeGrid: Grid;

export var activeGridCPNT: GridCPNT;

export var activeKeycodes: string[];

export interface Grid extends React.Props<any> {
    buttons: Button[];
    colors?: string[];
    style?: React.CSSProperties;
    highlightColor?: string;
    properties: Properties;
};

export interface Properties {
    root: Boolean;
    parent?: Grid;
}

export type extensionTypes = "web"

export const extensions: { [id: string]: Function; } = {
    "web": (fileName: string, folderPath: string, button: Button): Button => {
        button.type = "url";
        button.value = fs.readFileSync(`${folderPath}/${fileName}`, "utf8")
        return button;
    }
}

export function formatGrid(grid: Grid): Grid {
    grid.properties = {root: false};
    grid.buttons.forEach((button) => {
        switch (button.type) {
            case "grid":
                button.value = formatGrid(button.value as Grid);
                break;
            case "long folder":
                button.type = "grid";
                button.value = formatGrid(dir2GridRecursive(button.value as string));
                break;
            case "short folder":
                button.type = "grid";
                button.value = formatGrid(dir2Grid(button.value as string));
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

export function setKeycodes(size: number) {
    activeKeycodes = keyGen(2, size);
}

export function renderButtons(grid: Grid): JSX.Element[] {
    let gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(grid.buttons.length))).toString() + "%";
    let style: React.CSSProperties = {
        width: gridSize,
        height: gridSize,
        backgroundColor: "#e74c3c"
    }
    let renderedButtons: JSX.Element[] = [];


    grid.buttons.forEach((button, id) => {
        let buttonStyle: React.CSSProperties = { ...style };
        if (button.color) {
            buttonStyle.backgroundColor = button.color;
        } else if (grid.colors) {
            buttonStyle.backgroundColor = grid.colors[Math.floor(Math.random() * grid.colors.length)];;
        } else if (config.colors) {
            buttonStyle.backgroundColor = config.colors[Math.floor(Math.random() * config.colors.length)];;
        }
        if (config.style) {
            Object.assign(buttonStyle, config.style);
        }
        if (grid.style) {
            Object.assign(buttonStyle, this.props.style);
        }
        if (button.style) {
            Object.assign(buttonStyle, button.style);
        }

        button.keycode = activeKeycodes[id];
        renderedButtons.push(<div className="button-container" style= { buttonStyle } key= { id } > <ButtonCPNT {...button } /></div>);
    });
    return renderedButtons;
}

export function setActiveGridCPNT(grid: GridCPNT) {
    activeGridCPNT = grid;
}

export function loadGrid(grid: Grid): void {
    if (activeGrid) {
        grid.properties.parent = activeGrid;
    }
    setKeycodes(grid.buttons.length);
    setActiveGrid(grid);
    if (activeGridCPNT) {
        let renderedButtons = renderButtons(grid);
        activeGridCPNT.setState({ buttons: renderedButtons});
    } else {
        renderGrid(grid);
    }

};

export function setActiveGrid(grid: Grid) {
    activeGrid = grid;
}

export function dir2Grid(folderPath: string): Grid {
    let dir = fs.readdirSync(folderPath);
    let grid: Grid = {buttons: [], properties: undefined};
    dir.forEach((file: string) => {
        let button: Button = {text: path.basename(file, path.extname(file)), type: "app", value: ""};
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

export function dir2GridRecursive(folderPath: string): Grid {
    let dir = fs.readdirSync(folderPath);
    if(!config.showHidden || (typeof config.showHidden === 'boolean' && !config.showHidden)) {
        dir = dir.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    }
    let grid: Grid = {buttons: [], properties: undefined};
    dir.forEach((file: string) => {
        let button: Button = {text: path.basename(file, path.extname(file)), type: "app", value: ""};
        if (fs.statSync(`${folderPath}/${file}`).isDirectory() && path.extname(file) !== ".app") {
            button.type = "grid";
            button.value = dir2GridRecursive(`${folderPath}/${file}`);
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