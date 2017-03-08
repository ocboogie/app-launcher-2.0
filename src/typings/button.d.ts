import { Props } from 'react';
import ButtonCPNT from '../app/components/button';
import GridCPNT from '../app/components/grid';
import Grid from '../app/objects/grid';
import * as gridTypes from './grid';
import Button from '../app/objects/button';


type unformattedButtonTypes = "url" | "app" | "cmd" | "grid" | "short folder" | "long folder";

type formattedButtonTypes = "url" | "app" | "cmd" | "grid";

interface buttonType {
    run: (Button: Button, close: () => void) => void;
}

interface buttonJSON {
    text: string;
    type: unformattedButtonTypes;
    value: gridTypes.gridJSON | string;
    color?: string;
}

interface buttonFormattedJSON {
    text: string;
    type: formattedButtonTypes;
    value: Grid | string;
    color?: string;
}

type buttonCPNT = React.ReactElement<Button>;