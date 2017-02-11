import * as React from 'react';

export interface ButtonProps {
    text: string;
}

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
