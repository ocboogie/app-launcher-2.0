import * as React from 'react';
import { Button, ButtonStates, runButton, activeButtonCPNTs } from '../button';
import {ipcRenderer} from 'electron';

export default class extends React.Component<Button, ButtonStates> {

    constructor(props: Button) {
      super(props);
      this.state = { keycode: <span>{this.props.keycode}</span>}
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        runButton(this.props);
    }

    componentDidMount() {
        activeButtonCPNTs.push(this);
    }

    componentWillUnmount() {
        activeButtonCPNTs.pop();
    }

    render() {
        return (
            <div className="text" onClick={this.handleClick}>
                <span>
                    {this.props.text}
                    <br/>
                    {this.state.keycode}
                </span>
            </div>
        );
    }
}
