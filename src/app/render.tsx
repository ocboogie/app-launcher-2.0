import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ButtonProps} from './button';
import App from './app';

export default function(buttons: ButtonProps[]) {
    ReactDOM.render(
        <App buttons={buttons} />,
        document.getElementById('content')
    );
};
