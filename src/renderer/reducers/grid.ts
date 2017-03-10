import { ipcRenderer } from 'electron';

import { getConfig } from '../config';
import { findRoot } from '../lib/grid';

const reducer = (state: Grid.formattedJSON = <Grid.formattedJSON>{}, action: Action) => {
    if (action) {
        switch (action.type) {
            case "GRID_BACK":
                if (state.parent) {
                    return { ...state.parent }
                } else {
                    ipcRenderer.send("hide");
                }
            case "GRID_ROOT":
                return { ...findRoot(state) }
            case "GRID_LOAD":
                if (Object.keys(state).length !== 0 && state.constructor === Object) {
                    action.payload.parent = state;
                    return { ...state, ...action.payload }
                } else {
                    return { ...state, ...action.payload }
                }
            case "GRID_INIT":
            case "GRID_RELOAD":
                return { ...state, ...action.payload }
        }
    }
    return state
}

export default reducer;