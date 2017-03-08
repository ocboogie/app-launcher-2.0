import * as React from 'react';
import * as buttonTypes from '../../typings/button';
import Button from '../objects/button';


export default class ButtonCPNT extends React.Component<Button, {}> {

    constructor(Button: Button) {
        super(Button);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.run();
    }

    render() {
        return (
            <div className="text" onClick={this.handleClick}>
                <span>
                    {this.props.buttonFormattedJSON.text}
                </span>
            </div>
        )
    }
}