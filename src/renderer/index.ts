import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer, webFrame } from 'electron';
import { Provider } from 'react-redux';
import * as Redux from 'redux';

import Layout from './components/layout';
import createStore from './store';
import { initConfig, reloadConfig } from './actions/config';
import { initGrid, reloadGrid, rootGrid } from './actions/grid';
import { display } from './actions/notify';
import * as config from './config';
import render from './lib/render';
import { formatGrid } from './lib/grid';
import store from './store';

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);


store.dispatch(initConfig(config.getConfig()));
store.dispatch(initGrid(formatGrid(config.getConfig().rootGrid)))
config.subscribe(() => {
    store.dispatch(reloadConfig(config.getConfig()))
    store.dispatch(reloadGrid(formatGrid(config.getConfig().rootGrid)))
    store.dispatch(display("Reloaded config"))
});



ipcRenderer.on("hide", (event) => {
    store.dispatch(rootGrid());
    // loadGrid(activeConfig.formattedJSON.rootGrid);
});

render(store);

