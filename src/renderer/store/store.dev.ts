import * as Redux from 'redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default () =>
    createStore(
        rootReducer,
        applyMiddleware(
            thunk,
            createLogger()
        )
    );