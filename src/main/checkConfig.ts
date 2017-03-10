import * as React from 'React';
import isValidAccelerator from 'electron-is-accelerator';

export function checkConfig(config: Config.JSON): string {
    if (config.hotkey && !isValidAccelerator(config.hotkey)) {
        return "<code>hotkey</code> is not a valid accelerator in config.json"
    }

    if (typeof config.rootGrid !== 'undefined') {
        return checkGrid(config.rootGrid, "config.rootGrid");
    }
}

function checkGrid(grid: Grid.JSON, path: string): string {
    if (typeof grid.buttons === 'undefined') {
        return "<code>buttons</code> is required in " + path;
    }
    if (!Array.isArray(grid.buttons)) {
        return "<code>buttons</code> must be an array of buttons" + path;
    } else {
        let error = null;
        grid.buttons.forEach((button, id) => {
            let buttonError = checkButton(button, `${path}.[${id}]`)
            if (buttonError) {
                error = buttonError 
                return
            }
        });
        return error
    }
    
    
}

function checkButton(button: Button.JSON, path: string): string {
    if (typeof button.text === 'undefined') {
        return "<code>text</code> is required in " + path
    }
}