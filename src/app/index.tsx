import * as React from 'react';
import {Button, ButtonTypes} from './components/button';
import {Grid} from './components/grid';
import render from './render';



let grid: Grid ={
            buttons: [
                {text: "TEST1", type: "app", value: "C:/Program Files/Sublime Text 3/sublime_text.exe"},
                {text: "TEST2", type: "app", value: ""},
                {text: "TEST3", type: "app", value: ""},
                {text: "TEST4", type: "app", value: ""},
                {text: "TEST5", type: "app", value: ""}
            ]
        };
render(grid);
