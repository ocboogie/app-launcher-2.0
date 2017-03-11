import * as React from 'react';
import { shell, ipcRenderer } from 'electron';
import { exec } from 'child_process';

import { loadGrid } from '../actions/grid';
import store from '../store';
import ButtonCPNT from '../components/button';
import { formatGrid } from './grid';
import { display } from '../actions/notify';

export function formatButton(button: Button.JSON) {
    let buttonFormatted: Button.formattedJSON = <Button.formattedJSON>{ ...button };
    if (button.type === "grid") {
        buttonFormatted.value = formatGrid(<Grid.JSON>button.value, false);
    }
    return buttonFormatted;
}

export function renderButton(button: Button.formattedJSON) {
    return React.createElement(ButtonCPNT, { ...button })
}

export function runButton(button: Button.formattedJSON) {
    if (buttonTypes[button.type].run) {
        buttonTypes[button.type].run(button, () => {
            ipcRenderer.send("hide window");
        })
    }
}

const buttonTypes: { [id: string]: { run: (Button: Button.formattedJSON, close: () => void) => void } } = {
    "app": {
        run: (buttonJSON: Button.formattedJSON, close: () => void) => {
            close();
            if (process.platform === "darwin") {
                exec(`open \"${buttonJSON.value}\"`, (error, stdout, stderr) => {
                    if (error) {
                        store.dispatch(display("Error"));
                        ipcRenderer.send("show window")
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });
            } else {
                exec(`\"${buttonJSON.value}\"`, (error, stdout, stderr) => {
                    if (error) {
                        store.dispatch(display("Error"));
                        ipcRenderer.send("show window")
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });
            }
        }
    },
    "cmd": {
        run: (buttonJSON: Button.formattedJSON, close: () => void) => {
            close();
            exec(`${buttonJSON.value}`, (error, stdout, stderr) => {
                if (error) {
                    store.dispatch(display("Error"));
                    ipcRenderer.send("show window")
                    console.error(`exec error: ${error}`);
                    return;
                }
            });
        }
    },
    "grid": {
        run: (buttonJSON: Button.formattedJSON, close: () => void) => {
            store.dispatch(loadGrid(<Grid.formattedJSON>buttonJSON.value));
        }
    },
    "url": {
        run: (buttonJSON: Button.formattedJSON, close: () => void) => {
            close();
            shell.openExternal(<string>buttonJSON.value)
        }
    }

}