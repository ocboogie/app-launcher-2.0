import { Props } from 'react';
import { loadGrid, Grid } from './grid';
import { exec } from 'child_process';
import * as open from 'open';
import { ipcRenderer } from 'electron';
import * as os from 'os';
import ButtonCPNT from './components/buttonCPNT';

export interface Button {
    text: string;
    type: ButtonTypes;
    value: string | Grid;
    color?: string;
    style?: React.CSSProperties;
    keycode?: string;
    highlightColor?: string;
}

export interface ButtonStates {
    keycode: JSX.Element;
}

export type ButtonTypes = "app" | "cmd" | "grid" | "short folder" | "long folder" | "url";

export interface ButtonType {
    close: boolean;
    run?: (props: Button) => void;
}

export var activeButtonCPNTs: ButtonCPNT[] = [];

export function setActiveButtonCPNTs(buttonCPNTs: ButtonCPNT[]): void {
    activeButtonCPNTs = buttonCPNTs;
}

export const buttonTypes: { [id: string]: ButtonType; } = {
    "app": {
        close: true,
        run: (props: Button) => {
            if (os.platform() === "darwin") {
                exec(`open \"${props.value}\"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });
            } else {
                exec(`\"${props.value}\"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });
            }
        }
    },
    "cmd": {
        close: true,
        run: (props: Button) => {
            exec(`${props.value}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
        }
    },
    "grid": {
        close: false,
        run: (button: Button) => {
            if (typeof button.value !== "string") {
                loadGrid(button.value);
            }
        }
    },
    "short folder": {
        close: false
    },
    "long folder": {
        close: false
    },
    "url": {
        close: true,
        run: (props: Button) => {
            open(props.value);
        }
    }
}

export function runButton(button: Button) {
    if (button.value) {
        if (buttonTypes[button.type].run) {
            buttonTypes[button.type].run(button);
        }
        if (buttonTypes[button.type].close) {
            ipcRenderer.send("hide");
        }

    }
}