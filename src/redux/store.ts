import {persRed} from "./root-reducers";
import logger from 'redux-logger';
import {configureStore} from "@reduxjs/toolkit";
import {FLUSH, persistStore, REHYDRATE} from 'redux-persist';
import {PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist/es/constants";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";

export const sagaMiddleware = createSagaMiddleware();


let middleware: Array<any> = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

export const store = configureStore({
    reducer: persRed,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).prepend(...middleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);