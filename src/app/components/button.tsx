import * as React from 'react';
import {loadGrid, Grid, activeGrid} from '../grid';
import {exec} from 'child_process';
import * as open from 'open';

export type ButtonTypes = "app" | "cmd" | "grid" | "short folder" | "long folder" | "url";

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
            switch(this.props.type) {
                case "app":
                    exec(`\"${this.props.value}\"`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                        }
                    });
                    break;
                case "cmd":
                    exec(`${this.props.value}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                        }
                    });
                    break;
                case "grid":
                    if(typeof this.props.value !== "string"){
                        if (activeGrid) {
                            this.props.value.properties.parent = activeGrid;
                        }
                        loadGrid(this.props.value);
                    }
                    break;
                case "url":
                    open(this.props.value);
                    break
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
