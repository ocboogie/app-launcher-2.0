import * as React from 'react';
import {Button} from './button';
import GridCPNT from './gridCPNT';
import {Grid, gridBack} from '../grid';

export default class App extends React.Component<{grid: Grid}, {}> {
    constructor(props: any) {
      super(props);

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e: any) {
        gridBack();
    }

    render() {
        return (
            <div onContextMenu={this.handleClick} className="app">
                <GridCPNT grid={this.props.grid} />
            </div>
        );
    }
}
