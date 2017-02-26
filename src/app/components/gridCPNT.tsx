import * as React from 'react';
import {ButtonCPNT, Button} from './button';
import {Grid} from '../grid';
import {config} from '../config';

export default class GridCPNT extends React.Component<{grid: Grid}, {}> {
    render() {
        let gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(this.props.grid.buttons.length))).toString() + "%";
        let style: React.CSSProperties = {
            width: gridSize,
            height: gridSize,
            backgroundColor: "#e74c3c"
        }
        let renderedButtons: JSX.Element[] = [];
        // let renderedButtons = this.props.grid.buttons.map((button, id) =>
        //     <div className="button-container" style={style} key={id}><ButtonCPNT {...button}/></div>
        // );
        
        this.props.grid.buttons.forEach((button, id) => {
            let buttonStyle: React.CSSProperties = {...style};
            if(button.color) {
                buttonStyle.backgroundColor = button.color;
            } else if(config.colors) {
                buttonStyle.backgroundColor = config.colors[Math.floor(Math.random() * config.colors.length)];;
            }
            if(button.style) {
                Object.assign(buttonStyle, button.style);
            }
            renderedButtons.push(<div className="button-container" style={buttonStyle} key={id}><ButtonCPNT {...button}/></div>);
        });

        return (
            <div className="grid">
                {renderedButtons}
            </div>
        );
    }
}
