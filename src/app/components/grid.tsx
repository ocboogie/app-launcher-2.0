import * as React from 'react';
import * as gridTypes from '../typings/grid';
import * as buttonTypes from '../typings/button';
import { setActiveGridCPNT } from '../globals';
import ButtonCPNT from './button';
import { renderButtons } from '../lib/button';
import Grid from '../objects/grid';


export default class GridCPNT extends React.Component<Grid, gridTypes.gridStates> {
    constructor(props: Grid) {
        super(props);
        
        let renderedButtons: buttonTypes.buttonCPNT[] = renderButtons(props.gridFormattedJSON.buttons);

        this.state = { buttons: renderedButtons };
        setActiveGridCPNT(this);
    }

    render() {
        return (
            <div className="grid">
                {this.state.buttons}
            </div>
        )
    }
}