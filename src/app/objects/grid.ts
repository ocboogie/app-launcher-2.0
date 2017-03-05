import * as gridTypes from "../typings/grid";
import GridCPNT from '../components/grid';

export default class Gird {
    gridCPNT: GridCPNT;
    gridJSON: gridTypes.gridJSON;
    
    constructor(gridCPNT: GridCPNT, gridJSON: gridTypes.gridJSON) {
        this.gridCPNT = gridCPNT;
        this.gridJSON = gridJSON
    }
}