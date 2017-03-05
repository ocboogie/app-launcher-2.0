import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as config from './config';
import {ipcRenderer, webFrame} from 'electron';
import GridCPNT from './components/grid';

webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

ipcRenderer.on("show", (event) => {
    // loadGrid(config.rootGrid);
});

config.initConfig();


console.log(config.activeConfig.formattedJSON.rootGrid.GridCPNT);


ReactDOM.render(
    <GridCPNT {...config.activeConfig.formattedJSON.rootGrid.gridFormattedJSON}/>,
    document.getElementById('content')
)

// let config: Button = jsonfile.readFileSync("../config.json");



