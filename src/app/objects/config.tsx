import * as configTypes from '../../typings/config';
import Grid from './grid';
import GridCPNT from '../components/grid';
import { formatConfig } from '../lib/config';


export default class Config {
    public JSON: configTypes.configJSON;
    public formattedJSON: configTypes.configFormattedJSON;

    constructor(config: configTypes.configJSON) {
        this.JSON = config;
        this.formattedJSON = formatConfig(this);
        
    }


    
}