import {combineReducers } from "redux";
import {userReducer} from "./user/user.reducer";
import {cartReducer} from "./cart/cart.reducer";

export const rootReducers = combineReducers({
    userReducer,
    cartReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducers>;

