import * as React from 'react';
import ButtonCPNT from './buttonCPNT';
import { Button, setActiveButtonCPNTs} from '../button';
import { Grid, setActiveGridCPNT, activeKeycodes, renderButtons } from '../grid';
import {config} from '../config';

export interface ButtonStates {
    keycode: JSX.Element;
}

export default class GridCPNT extends React.Component<Grid, {buttons: JSX.Element[]}> {
    constructor(props: Grid) {
        super(props);
        let renderedButtons = renderButtons(this.props)
        this.state = { buttons: renderedButtons};
        setActiveGridCPNT(this);
    }

    render() {
        return (
            <div className="grid">
                {this.state.buttons}
            </div>
        );
    }
}
