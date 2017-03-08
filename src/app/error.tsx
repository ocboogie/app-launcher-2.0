import { renderButtons } from './lib/button';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer, webFrame } from 'electron';

ipcRenderer.on("error", (e, text: string) => {
    render(text);
});

console.log("TEST")
function render(text: string) {
    ReactDOM.render(
        <span>{text}</span>,
        document.getElementById('content')
    );
}

ipcRenderer.send("loaded");
