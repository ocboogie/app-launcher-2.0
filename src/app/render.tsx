import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Error from './components/error';
import {Grid} from './grid';
import App from './components/app';

export function renderGrid(grid: Grid): void {
    ReactDOM.render(
        <App grid={grid} />,
        document.getElementById('content')
    );
};

export function renderError(err: Error): void {
    ReactDOM.render (
        <Error text={err.toString()}/>,
        document.getElementById('content')
    );
}
