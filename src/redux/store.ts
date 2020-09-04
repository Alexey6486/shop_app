import {createStore, applyMiddleware} from "redux";
import {rootReducers} from "./root-reducers";
import logger from 'redux-logger';
import {configureStore} from "@reduxjs/toolkit";

const middleware = [logger];

//export const store = createStore(rootReducers, applyMiddleware(...middleware));

export const store = configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(...middleware),
})