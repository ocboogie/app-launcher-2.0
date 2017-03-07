import * as React from 'react';
import GridCPNT from './grid';
import { activeGrid } from '../globals';
import Grid from '../objects/grid';


export default class App extends React.Component<Grid, {}> {
    constructor(props: any) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e: any) {
        activeGrid.back(true)
        // if (activeGrid.properties.root) {
        //     ipcRenderer.send("hide");
        // } else {
        //     gridBack();
        // }
    }

    render() {
        return (
            <div onContextMenu={this.handleClick} className="app">
                <GridCPNT {...this.props} />
            </div>
        );
    }
}