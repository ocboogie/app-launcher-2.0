import * as React from 'react';
import {Button} from './button';
import GridCPNT from './gridCPNT';
import {Grid} from '../grid';

export default class App extends React.Component<{grid: Grid}, {}> {
    render() {
        return (
            <div className="app">
                <GridCPNT grid={this.props.grid} />
            </div>
        );
    }
}
