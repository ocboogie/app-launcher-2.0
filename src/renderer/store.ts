import * as Redux from 'redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as createLogger from 'redux-logger';
import thunk from 'redux-thunk'; 

import rootReducer from './reducers';

const middleware = applyMiddleware(thunk, createLogger())

function createMyStore (): Redux.Store<StoreJSON> {
    return createStore<StoreJSON>(rootReducer, middleware)
}
const store: Redux.Store<StoreJSON> = createMyStore();
export default store;
