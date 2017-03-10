import { combineReducers } from 'redux';
import * as Redux from 'redux';

import config from './config';
import grid from './grid';
import notify from './notify';

export default <Redux.Reducer<StoreJSON>>combineReducers({
    config,
    grid,
    notify
});