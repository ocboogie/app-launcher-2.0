import Config from '../objects/config';
import { setActiveConfig } from '../globals';
import * as configTypings from '../typings/config'


export function initConfig(configPath: configTypings.configJSON) {
    setActiveConfig(new Config(configPath));
}