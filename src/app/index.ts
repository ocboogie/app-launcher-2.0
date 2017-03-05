import * as React from 'react';
import * as config from './config';
import {ipcRenderer, webFrame} from 'electron';

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

ipcRenderer.on("show", (event) => {
    // loadGrid(config.rootGrid);
});

config.initConfig();
console.log(config.activeConfig);







// let config: Button = jsonfile.readFileSync("../config.json");



