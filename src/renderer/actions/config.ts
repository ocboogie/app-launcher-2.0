export function initConfig(config: Config.JSON): Action {
    return {
        type: "CONFIG_INIT",
        payload: config
    }
}

export function reloadConfig(config: Config.JSON): Action {
    return {
        type: "CONFIG_RELOAD",
        payload: config
    }
}