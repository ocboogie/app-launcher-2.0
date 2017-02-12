import * as React from 'react';
import {Button, ButtonProps} from './button';

export default class Grid extends React.Component<{buttons: ButtonProps[]}, {}> {
    render() {
        let buttons = this.props.buttons;
        let gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(buttons.length))).toString() + "%";
        let style = {
            width: gridSize,
            height: gridSize
        }
        let renderedButtons = buttons.map((button, id) =>
            <div className="grid" style={style} key={id}><Button text={button.text}/></div>
        );

        return (
            <div className="button-container">
                {renderedButtons }
            </div>
        );
    }
}
