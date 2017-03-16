import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer, webFrame } from 'electron';
import { Provider } from 'react-redux';
import * as Redux from 'redux';

import Layout from './components/layout';
import { initConfig, reloadConfig } from './actions/config';
import { initGrid, reloadGrid, rootGrid } from './actions/grid';
import { display } from './actions/notify';
import * as config from './config';
import render from './lib/render';
import { formatGrid, dir2Grid, dir2GridRecursive } from './lib/grid';
import { initStore, getStore} from './store/index';

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);
initStore();

let store = getStore();

ipcRenderer.on("reload folder changed", () => {
    store.dispatch(reloadGrid(dir2GridRecursive(config.getConfig().launcherFolder)));
    store.dispatch(display("Reloaded launcher folder"));
});

store.dispatch(initConfig(config.getConfig()));
if (!config.getConfig().rootGrid) {
    store.dispatch(initGrid(dir2GridRecursive(config.getConfig().launcherFolder)));
} else {
    store.dispatch(initGrid(formatGrid(config.getConfig().rootGrid)));
}

config.subscribe(() => {
    store.dispatch(reloadConfig(config.getConfig()));
    if (config.getConfig().rootGrid) {
        store.dispatch(reloadGrid(formatGrid(config.getConfig().rootGrid)));
    }
    store.dispatch(display("Reloaded config"));
});


ipcRenderer.on("hide", (event) => {
    store.dispatch(rootGrid());
    // loadGrid(activeConfig.formattedJSON.rootGrid);
});

render(store);

