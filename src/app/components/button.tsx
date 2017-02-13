import * as React from 'react';
import loadGrid from '../loadGrid';
import {exec} from 'child_process';
import {Grid} from './grid';
import {activeGrid} from '../activeGrid';

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
        console.log(activeGrid);
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
                        if (typeof activeGrid !== "null") {
                            this.props.value.parent = activeGrid;
                        }
                        loadGrid(this.props.value);
                    }
                    break;
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
