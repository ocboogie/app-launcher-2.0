import Config from '../objects/config';
import { setActiveConfig } from '../globals';
import * as configTypings from '../typings/config'
import Grid from '../objects/grid';


export function initConfig(configPath: configTypings.configJSON) {
    setActiveConfig(new Config(configPath));
}

export function formatConfig(config: Config): configTypings.configFormattedJSON {
    let formattedJSON: configTypings.configFormattedJSON = { rootGrid: new Grid(config.JSON.rootGrid) };
    return formattedJSON;
}