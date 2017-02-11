import {ButtonProps} from './button';
import Grid from './grid';
import React from 'react';
import ReactDOM from 'react-dom';

export default function(buttons: ButtonProps[]) {
    ReactDOM.render(
        <Grid buttons={buttons} />,
        document.getElementById('content')
    );
};
