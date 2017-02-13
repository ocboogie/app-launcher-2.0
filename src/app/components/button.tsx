import * as React from 'react';
import {loadGrid, Grid, activeGrid} from '../grid';
import {exec} from 'child_process';

export type ButtonTypes = "app" | "cmd" | "grid";

export interface Button {
    text: string;
    type: ButtonTypes;
    value: string | Grid;
    color?: string;
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
                            this.props.value.parent = activeGrid;
                        }
                        loadGrid(this.props.value);
                    }
                    break;
            }
        }
    }
    render() {
        let style = null;
        if (this.props.color) {
            style = {backgroundColor: this.props.color};
        } else {
            style = {};

        }
        return (
            <div style={style} className="text" onClick={this.handleClick}>
                <span>
                    {this.props.text}
                </span>
            </div>
        );
    }
}
