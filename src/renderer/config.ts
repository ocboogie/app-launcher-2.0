import { remote, ipcRenderer } from 'electron';

const config = remote.require('./config');

export function getConfig() {
    return config.getConfig();
}

export function subscribe(fn: () => void) {
    ipcRenderer.on('config change', fn);
}