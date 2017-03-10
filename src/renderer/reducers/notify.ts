import { getConfig } from '../config';

const reducer = (state = { text: "", activated: false }, action: Action) => {
    if (action) {
        switch (action.type) {
            case "NOTIFY_DESTROY":
            case "NOTIFY_DISPLAY":
                return { ...state, ...action.payload, }
        }
    }
    return state
}

export default reducer;