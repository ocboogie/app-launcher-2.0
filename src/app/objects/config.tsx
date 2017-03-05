import * as configTypes from '../typings/config';
import Grid from './grid';
import GridCPNT from '../components/grid';


export default class Config {
    public JSON: configTypes.configJSON;
    public formattedJSON: configTypes.configFormattedJSON;

    constructor(config: configTypes.configJSON) {
        this.JSON = config;
        this.formattedJSON = this.format();
        
    }

    format(): configTypes.configFormattedJSON {
        let formattedJSON: configTypes.configFormattedJSON = { rootGrid: new Grid(this.JSON.rootGrid) };
        return formattedJSON;
    }
    
}