import * as configTypes from '../typings/config';


export default class Config {
    json: configTypes.configJSON;

    constructor(config: configTypes.configJSON) {
        this.json = config;
    }
    
}