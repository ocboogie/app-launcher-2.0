import * as React from 'react';
import {loadGrid, Grid, activeGrid} from '../grid';
import {exec} from 'child_process';
import * as open from 'open';
import {ipcRenderer} from 'electron';
import * as os from 'os';


export type ButtonTypes = "app" | "cmd" | "grid" | "short folder" | "long folder" | "url";

export interface ButtonType {
    close: boolean;
    run?: (props: Button) => void;
}

const buttonTypes: { [id: string]: ButtonType; } = {
    "app": {
        close: true,
        run: (props: Button) => {
            if(os.platform() === "darwin") {
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
            if(typeof button.value !== "string"){
                if (activeGrid) {
                    button.value.properties.parent = activeGrid;
                }
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

export interface Button {
    text: string;
    type: ButtonTypes;
    value: string | Grid;
    color?: string;
    style?: React.CSSProperties;
}

export class ButtonCPNT extends React.Component<Button, {}> {

    constructor(props: any) {
      super(props);

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.props.value) {
            if (buttonTypes[this.props.type].run) {
                buttonTypes[this.props.type].run(this.props);
            }
            if(buttonTypes[this.props.type].close) {
                ipcRenderer.send("hide");
            } 
        
        }
    }
    render() {
        return (
            <div className="text" onClick={this.handleClick}>
                <span>
                    {this.props.text}
                </span>
            </div>
        );
    }
}
