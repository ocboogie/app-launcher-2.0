import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GridCPNT from './components/grid';
import * as gridTypes from './typings/grid';

export default function(props: gridTypes.gridProps) {
    ReactDOM.render(
        <GridCPNT {...props}/>,
        document.getElementById('content')
    );
}