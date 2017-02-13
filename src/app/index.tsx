import * as React from 'react';
import {Button, ButtonTypes} from './components/button';
import {loadGrid, Grid} from './grid';

let grid2: Grid ={
    buttons: [
        {text: "TEST5", type: "app", value: "C:/Program Files/Sublime Text 3/sublime_text.exe"},
        {text: "TEST6", type: "app", value: ""},
        {text: "TEST7", type: "app", value: ""},
        {text: "TEST8", type: "app", value: ""},
        {text: "TEST9", type: "cmd", value: "start ."}
    ]
};

let grid: Grid ={
            buttons: [
                {text: "TEST1", type: "app", value: "C:/Program Files/Sublime Text 3/sublime_text.exe"},
                {text: "TEST2", type: "app", value: ""},
                {text: "TEST3", type: "app", value: ""},
                {text: "TEST4", type: "app", value: ""},
                {text: "TEST5", type: "grid", value: grid2}
            ]
        };
loadGrid(grid);
