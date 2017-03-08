import * as React from 'react';
import Grid from '../objects/grid';
import GridCPNT from '../components/grid';
import Button from '../objects/button';
import * as buttonTypes from './button';
import ButtonCPNT from '../components/button';


interface gridStates {
    buttons: buttonTypes.buttonCPNT[];
}

interface gridJSON {
    buttons: buttonTypes.buttonJSON[];
    buttonColors: string[];
}

interface gridFormattedJSON {
    buttons: Button[];
    parent?: Grid;
    buttonColors: string[];
}
