import {persRed} from "./root-reducers";
import logger from 'redux-logger';
import {configureStore} from "@reduxjs/toolkit";
import {FLUSH, persistStore, REHYDRATE} from 'redux-persist';
import {PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist/es/constants";
import thunkMiddleware from 'redux-thunk';

let middleware: Array<any> = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

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