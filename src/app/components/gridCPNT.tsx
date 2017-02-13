import * as React from 'react';
import {ButtonCPNT, Button} from './button';
import {Grid} from '../grid';

export default class GridCPNT extends React.Component<{grid: Grid}, {}> {
    render() {
        let gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(this.props.grid.buttons.length))).toString() + "%";
        let style = {
            width: gridSize,
            height: gridSize
        }
        let renderedButtons = this.props.grid.buttons.map((button, id) =>
            <div className="button-container" style={style} key={id}><ButtonCPNT {...button}/></div>
        );

        return (
            <div className="grid">
                {renderedButtons}
            </div>
        );
    }
}
