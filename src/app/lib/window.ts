import { ipcRenderer, webFrame } from 'electron';

export function hideWindow() {
    ipcRenderer.send("hide");
}
