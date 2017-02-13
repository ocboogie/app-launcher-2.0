import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Grid} from './components/grid';
import App from './components/app';

export default function(grid: Grid): void {
    ReactDOM.render(
        <App grid={grid} />,
        document.getElementById('content')
    );
};
