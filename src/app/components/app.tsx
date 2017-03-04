import * as React from 'react';
import {ipcRenderer} from 'electron';
import {Button} from '../button';
import GridCPNT from './gridCPNT';
import {Grid, gridBack, activeGrid, setActiveGridCPNT} from '../grid';

export default class App extends React.Component<{grid: Grid}, {}> {
    constructor(props: any) {
      super(props);

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e: any) {
        if(activeGrid.properties.root) {
            ipcRenderer.send("hide");
        } else {
            gridBack();
        }
    }

    render() {
        let grid = <GridCPNT {...this.props.grid} />;
        setActiveGridCPNT(grid);
        return (
            <div onContextMenu={this.handleClick} className="app">
                <GridCPNT {...this.props.grid} />
            </div>
        );
    }
}
