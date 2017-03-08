import { Props } from 'react';
import ButtonCPNT from '../components/button';
import GridCPNT from '../components/grid';
import Grid from '../objects/grid';
import * as gridTypes from './grid';
import Button from '../objects/button';


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