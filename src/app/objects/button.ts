import * as buttonTypes from "../typings/button";
import ButtonCPNT from '../components/button';


export default class Button {
    ButtonCPNT: React.ReactElement<buttonTypes.buttonProps>;
    buttonJSON: buttonTypes.buttonJSON;
    buttonFormattedJSON: buttonTypes.buttonFormattedJSON;
    
    constructor(buttonJSON: buttonTypes.buttonJSON) {
        this.buttonJSON = buttonJSON;
    }

    public format() {

    }

    public render() {

    }
}