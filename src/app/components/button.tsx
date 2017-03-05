import * as React from 'react';
import * as buttonTypes from '../typings/button';

export default class ButtonCPNT extends React.Component<buttonTypes.buttonProps, {}> {
    render() {
        return (
            <div className="grid">
                {this.props.text}
            </div>
        )
    }
}