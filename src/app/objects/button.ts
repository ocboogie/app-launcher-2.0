import * as buttonTypings from '../typings/button';
import * as gridTypes from '../typings/grid';
import ButtonCPNT from '../components/button';
import Grid from './grid';
import { formatButton } from '../lib/button';
import { buttonTypes } from '../lib/button';
import { ipcRenderer } from 'electron';


export default class Button {
    buttonJSON: buttonTypings.buttonJSON;
    buttonFormattedJSON: buttonTypings.buttonFormattedJSON;


    public run() {
        if (this.buttonFormattedJSON.value) {
            if (buttonTypes[this.buttonFormattedJSON.type].run) {
                buttonTypes[this.buttonFormattedJSON.type].run(this, () => {
                    ipcRenderer.send("hide");
                });
            }
        }
    }

    constructor(buttonJSON: buttonTypings.buttonJSON) {
        this.buttonJSON = buttonJSON;
        this.buttonFormattedJSON = formatButton(buttonJSON);
        this.run = this.run;
    }



}