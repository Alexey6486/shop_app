import {combineReducers } from "redux";
import {userReducer} from "./user/user.reducer";

export const rootReducers = combineReducers({
    userReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducers>;

