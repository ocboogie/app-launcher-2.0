import * as React from 'react';
import * as gridTypes from "../typings/grid";
import GridCPNT from '../components/grid';
import Button from '../objects/button';
import ButtonCPNT from '../components/button';


export default class Gird {
    gridJSON: gridTypes.gridJSON;
    gridFormattedJSON: gridTypes.gridFormattedJSON;
    GridCPNT: gridTypes.gridCPNT;
    
    constructor(gridJSON: gridTypes.gridJSON) {
        this.gridJSON = gridJSON;
        this.gridFormattedJSON = this.format(gridJSON);
        this.GridCPNT = this.render(this.gridFormattedJSON);
    }

    private format(gridJSON: gridTypes.gridJSON): gridTypes.gridFormattedJSON {
        let gridFormattedJSON: gridTypes.gridFormattedJSON = {
            buttons: gridJSON.buttons.map((button) => {return new Button(button)}),
        };
        return gridFormattedJSON;
    }

    private render(gridFormattedJSON: gridTypes.gridFormattedJSON): gridTypes.gridCPNT {
        console.log(GridCPNT);
        
        return <GridCPNT {...gridFormattedJSON} />;
    }
}