import * as React from 'react';
import * as gridTypes from '../typings/grid';
import ButtonCPNT from './button';

export default class GridCPNT extends React.Component<gridTypes.gridProps, gridTypes.gridStates> {
    constructor(props: gridTypes.gridProps) {
        super(props);
        console.log("states");
        console.log(props.buttons);
        
        let states: gridTypes.gridStates = { buttons: props.buttons.map((button) => { return button.ButtonCPNT }) }
        
        this.state = states;
    }

    render() {
        return (
            <div className="grid">
                {this.state.buttons}
            </div>
        )
    }
}