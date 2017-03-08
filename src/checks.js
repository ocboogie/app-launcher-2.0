exports.checkConfig = function(config) {
    if (typeof config === 'undefined') {
        return "Requires a config.json file"
    }
    if (typeof config.rootGrid === 'undefined') {
        return "Requires rootGrid in config.json"
    } else {
        checkGrid(config.rootGrid);
    }

}

function checkGrid(grid) {

}

function checkButton(button) {

}