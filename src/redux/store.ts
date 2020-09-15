import {createStore, applyMiddleware} from "redux";
import {persRed, rootReducers} from "./root-reducers";
import logger from 'redux-logger';
import {configureStore} from "@reduxjs/toolkit";
import {FLUSH, persistStore, REHYDRATE} from 'redux-persist';
import {PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist/es/constants";

const middleware = [logger];

//export const store = createStore(rootReducers, applyMiddleware(...middleware));

export const store = configureStore({
    reducer: persRed,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).prepend(...middleware),
});

export const persistor = persistStore(store);