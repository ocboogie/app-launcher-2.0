import { getConfig } from '../config';

const reducer = (state = {}, action: Action) => {
    if (action) {
        switch (action.type) {
            case "CONFIG_INIT":
            case "CONFIG_RELOAD":
                return { ...action.payload}
        }
    }
    return state
}

export default reducer;