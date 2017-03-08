import * as React from 'react';
import * as buttonTypings from '../../typings/button';
import Grid from '../objects/grid';
import * as gridTypes from '../../typings/grid';
import { exec } from 'child_process';
import * as os from 'os';
import * as open from 'open';
import Button from '../objects/button';
import ButtonCPNT from '../components/button';
import { ipcRenderer } from 'electron';
import { loadGrid } from '../lib/grid';


export function formatButton(buttonJSON: buttonTypings.buttonJSON): buttonTypings.buttonFormattedJSON {
    let buttonFormattedJSON: buttonTypings.buttonFormattedJSON = buttonJSON as buttonTypings.buttonFormattedJSON;
    if (buttonJSON.type === "grid") {
            buttonFormattedJSON.value = new Grid(buttonJSON.value as gridTypes.gridJSON);
    }
    return buttonFormattedJSON;
}

export function renderButtons(buttons: Button[]): buttonTypings.buttonCPNT[] {
    let states: gridTypes.gridStates = {} as gridTypes.gridStates;
    let renderedButtons: buttonTypings.buttonCPNT[] = [];

    let gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(buttons.length))).toString() + "%";
    let style: React.CSSProperties = {
        width: gridSize,
        height: gridSize,
        backgroundColor: "#e74c3c"
    }
    
    buttons.forEach((button, key) => {
        renderedButtons.push(<div className="button-container" style= { style } key= { key } > <ButtonCPNT { ...button } /></div>);
    });
    return renderedButtons;
}

export const buttonTypes: { [id: string]: buttonTypings.buttonType; } = {
    "app": {
        run: (Button: Button, close: () => void) => {
            close();
            if (os.platform() === "darwin") {
                exec(`open \"${Button.buttonFormattedJSON.value}\"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });
            } else {
                exec(`\"${Button.buttonFormattedJSON.value}\"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });
            }
        }
    },
    "cmd": {
        run: (Button: Button, close: () => void) => {
            close();
            exec(`${Button.buttonFormattedJSON.value}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
        }
    },
    "grid": {
        run: (Button: Button, close: () => void) => {
            if (typeof Button.buttonFormattedJSON.value !== "string") {
                loadGrid(Button.buttonFormattedJSON.value);
            }
        }
    },
    "url": {
        run: (Button: Button, close: () => void) => {
            close();
            open(Button.buttonFormattedJSON.value);
        }
    }
    
}

