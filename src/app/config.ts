import * as rootPath from 'app-root-path';
import Config from './objects/config';

export let activeConfig: Config;

export function loadConfig() {

}

export function initConfig() {
    activeConfig = new Config(require(`${rootPath}/config`));
}