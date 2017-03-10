import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from "react-redux"

import App from '../components/layout';

export default function (store: Redux.Store<StoreJSON>) {
    ReactDOM.render(
        <Provider store={store} ><App /></Provider>,
        document.getElementById('content')
    );
}
