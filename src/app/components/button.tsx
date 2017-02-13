import * as React from 'react';
import {exec} from "child_process";
import {Grid} from './grid';

export type ButtonTypes = "app" | "cmd" | "folder";

export interface Button {
    text: string;
    type: ButtonTypes;
    value: string | Grid[];
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
                case "folder":
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
