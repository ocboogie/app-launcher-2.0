import * as React from 'react';
import {Button, ButtonProps} from './button';

export default class Grid extends React.Component<{buttons: ButtonProps[]}, {}> {
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
