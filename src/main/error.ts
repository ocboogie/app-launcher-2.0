const { dialog } = require('electron');


export function displayError(msg: string) {
    dialog.showMessageBox({
        message: msg,
        buttons: ['Ok']
    });
}