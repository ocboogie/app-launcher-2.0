import * as React from 'react';
import * as gridTypes from '../typings/grid';
import ButtonCPNT from './button';

export default class GridCPNT extends React.Component<gridTypes.gridProps, gridTypes.gridStates> {
    constructor(props: gridTypes.gridProps) {
        super(props);
        this.state = { buttons: props.buttons }
    }

    render() {
        return (
            <div className="grid">
                {this.state.buttons}
            </div>
        )
    }
}