import * as React from 'react';
import * as appRoot from 'app-root-path';


export default class extends React.Component<{text: string}, {}> {
    render() {
        return (
            <span>
                <pre>{this.props.text}</pre>
            </span>
        )
    }
}

