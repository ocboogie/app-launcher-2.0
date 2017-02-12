import * as React from 'react';

export interface ButtonProps {
    text: string;
}

export class Button extends React.Component<ButtonProps, {}> {
    handleClick() {
        console.log("TEST")
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
