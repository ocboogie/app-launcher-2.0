import {Button} from './button';
import React from 'react';
export default class Grid extends React.Component<{buttons}, {}> {
    render() {
        let buttons = this.props.buttons;
        let renderedButtons = buttons.map((button, id) =>
            <Button text={button.text} key={id}/>
        );

        return (
            <div className="Grid">
                {renderedButtons}
            </div>
        );
    }
}
