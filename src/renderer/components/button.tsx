/// <reference path="../../../typings.d.ts" />

import * as React from 'react';

import { runButton } from '../lib/button';

export default class ButtonCPNT extends React.Component<Button.formattedJSON, {}> {
    constructor(Button: Button.formattedJSON) {
        super(Button);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.props.run();
        console.log(this.props);
        
        runButton(this.props);
    }

    render() {
        return (
            <div className="text" onClick={this.handleClick}>
                <span>
                    {this.props.text}
                </span>
            </div>
        )
    }
}