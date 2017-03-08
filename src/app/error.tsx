import { renderButtons } from './lib/button';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';

ipcRenderer.on("error", (e, text: string) => {
    render(text);
});

class Button extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        ipcRenderer.send("restart")
    }

    render() {
        return (
            <p className="btn" onClick={this.handleClick}>Reload</p>
        )
    }
}

class App extends React.Component<{errorMessage: string}, {}> {
    render() {
        return (
            <div className="error">
                <h1>Error!</h1>
                <span className="msg">{this.props.errorMessage}</span>
                <br/>
                <Button />
            </div>
        )
    }
}

function render(text: string) {
    ReactDOM.render(
        <App errorMessage={text} />,
        document.getElementById('content')
    );
}

ipcRenderer.send("loaded");
