import {combineReducers } from "redux";
import {userReducer} from "./user/user.reducer";
import {cartReducer} from "./cart/cart.reducer";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //to use localStorage

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['cartReducer'],
};


export const rootReducers = combineReducers({
    userReducer,
    cartReducer,
});

export const persRed = persistReducer(persistConfig, rootReducers);

export type AppRootStateType = ReturnType<typeof rootReducers>;

