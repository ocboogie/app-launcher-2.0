import * as React from 'react';
import {ButtonProps} from './button';
import Grid from './grid';

export default class App extends React.Component<{buttons: ButtonProps[]}, {}> {
    render() {
        return (
            <div className="app">
                <Grid buttons={this.props.buttons} />
            </div>
        );
    }
}
