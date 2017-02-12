import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ButtonProps} from './components/button';
import App from './components/app';

export default function(buttons: ButtonProps[]) {
    ReactDOM.render(
        <App buttons={buttons} />,
        document.getElementById('content')
    );
};
