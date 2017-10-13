/**
 * Main Store Function 
 */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducer.js";
import promiseMiddleware from 'redux-promise';

export function configureStore( initialState = {}) { 
    let enhancers = [
        applyMiddleware(thunk),
        applyMiddleware(promiseMiddleware),
    ];
    if(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined) 
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

    const store = createStore(
        reducer, 
        initialState, 
        compose(...enhancers)
    );
    return store; 
}