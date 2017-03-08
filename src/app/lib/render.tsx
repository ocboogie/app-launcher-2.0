import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GridCPNT from '../components/grid';
import * as gridTypes from '../../typings/grid';
import App from '../components/app';
import Grid from '../objects/grid';


export default function(Grid: Grid) {
    ReactDOM.render(
        <App {...Grid}/>,
        document.getElementById('content')
    );
}
