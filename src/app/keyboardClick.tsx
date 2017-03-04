import * as React from 'react';
import { ipcRenderer } from 'electron';
import {runButton, activeButtonCPNTs} from './button';
import { activeKeycodes, activeGrid, activeGridCPNT, loadGrid, Grid, gridBack } from './grid';
import {config} from './config';

let keys = "";
let timer: NodeJS.Timer;

function updateButtons() {
    let none: boolean = true;
    activeButtonCPNTs.forEach((button) => {
        if (button.props.keycode.startsWith(keys)) {
            none = false;
            let highlightColor = "#f1c40f";
            if(button.props.highlightColor) {
                highlightColor = button.props.highlightColor;
            } else if (activeGrid.highlightColor) {
                highlightColor = activeGrid.highlightColor;
            } else if (config.highlightColor) {
                highlightColor = config.highlightColor;
            }
            button.setState({ keycode: (<div><span style={{"backgroundColor": highlightColor}}>{keys}</span><span>{button.props.keycode.slice(keys.length)}</span></div>) })
        }
    });
    if(none) {
        keys = "";
    }
}

ipcRenderer.on("keyPress", (event, key: string) => {
    
    keys += key;
    clearTimeout(timer);
    timer = setTimeout(() => {
        keys = "";
        updateButtons();
    }, 1000);
    if(keys.length >= 2) {
        if (activeKeycodes.includes(keys)) {
            activeGrid.buttons.forEach((button) => {
                if (button.keycode === keys) {
                    runButton(button);
                    clearTimeout(timer);
                    keys = "";
                }
            });
        }
    }
    updateButtons();
});

ipcRenderer.on("keyBack", (event) => {
    gridBack();
});
