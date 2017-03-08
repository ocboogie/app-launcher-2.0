import GridCPNT from '../components/grid';
import * as gridTypes from './grid';
import Grid from '../objects/grid';


interface configJSON {
    rootGrid?: gridTypes.gridJSON;
    buttonColors?: string[];
    style?: React.CSSProperties;
    debug?: boolean;
}

interface configFormattedJSON {
    rootGrid?: Grid;
    buttonColors?: string[];
    style?: React.CSSProperties;
    debug?: boolean;
}