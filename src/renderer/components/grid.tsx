/// <reference path="../../../typings.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';

import { renderButton } from '../lib/button';
import ButtonCPNT from './button';


class GridCPNTC extends React.Component<Grid.formattedJSON, any> {


    render() {
        let renderedButtons: Button.buttonCPNT[] = [];

        let { buttons } = this.props;
        let gridSize = (100 * 1.0 / Math.ceil(Math.sqrt(buttons.length))).toString() + "%";
        let style: React.CSSProperties = {
            width: gridSize,
            height: gridSize,
            backgroundColor: "#e74c3c"
        }

        buttons.forEach((button, key) => {
            let renderedButton = renderButton(button);
            renderedButtons.push(<div className="button-container" style={style} key={key} >{ renderedButton }</div>);
        });
        return (
            <div className="grid">
                {renderedButtons}
            </div>
        )
    }
}

const mapStateToProps = (state: StoreJSON) => (state.grid);
const GridCPNT = connect(mapStateToProps)(GridCPNTC);
export default GridCPNT;