import * as React from 'react';
import Grid from '../app/objects/grid';
import GridCPNT from '../app/components/grid';
import Button from '../app/objects/button';
import * as buttonTypes from './button';
import ButtonCPNT from '../app/components/button';


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
