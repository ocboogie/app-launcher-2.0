import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initConfig } from './lib/config';
import { activeConfig } from './globals';
import { ipcRenderer, webFrame } from 'electron';
import GridCPNT from './components/grid';
import Grid from './objects/grid';
import { initGrid, loadGrid } from './lib/grid';
import * as rootPath from 'app-root-path';


webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

ipcRenderer.on("show", (event) => {
    loadGrid(activeConfig.formattedJSON.rootGrid);
});

initConfig(require(`${rootPath}/config`));

initGrid(activeConfig.formattedJSON.rootGrid);
