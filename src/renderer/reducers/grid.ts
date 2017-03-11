import { ipcRenderer } from 'electron';

import { getConfig } from '../config';
import { findRoot } from '../lib/grid';

const reducer = (state: Grid.formattedJSON = <Grid.formattedJSON>{}, action: Action) => {
    if (action) {
        switch (action.type) {
            case "GRID_BACK":
                if (!state.isRoot) {
                    return { ...state.parent }
                } else {
                    ipcRenderer.send("hide window");
                    return { ...state}
                }
            case "GRID_ROOT":
                return { ...findRoot(state) }
            case "GRID_LOAD":
                if (Object.keys(state).length !== 0 && state.constructor === Object) {
                    return { ...state, ...action.payload, parent: {...state} }
                } else {
                    return { ...state, ...action.payload }
                }
            case "GRID_INIT":
            case "GRID_RELOAD":
                return { ...action.payload }
        }
    }
    return state
}

export default reducer;