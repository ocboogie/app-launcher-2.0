import * as Redux from 'redux';

import storeForProduction from './store.prod';
import storeForDevelopment from './store.dev';


let store: Redux.Store<StoreJSON>;

export function getStore(): Redux.Store<StoreJSON> {
    return store;
}

export function initStore() {
    if (process.env.NODE_ENV === 'production') {
        store = storeForProduction();
    } else {
        store = storeForDevelopment();
    }

}