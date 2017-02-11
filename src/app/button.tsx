import React from 'react';

export interface ButtonProps {
    text: string;
}
/*
export default class Button {
    text: string;
    constructor(text: string) {
        this.text = text;
    }
    render(key) {
        return (
            <div key={key} className="Button">
                <span>
                    {this.text}
                </span>
            </div>
        )
    }
}
*/

export class Button extends React.Component<ButtonProps, {}> {

    render() {
        return (
            <div className="button">
                <span>
                    {this.props.text}
                </span>
            </div>
        );
    }
}
