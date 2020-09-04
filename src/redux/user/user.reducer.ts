import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type CurrentUserType = {
    createdAt: {
        nanoseconds: number
        seconds: number
    }
    displayName: string
    email: string
    id: string
}

type UserDataType = CurrentUserType | null;

export type UserStateType = {
    currentUser: UserDataType
    isLoggedIn: boolean
};

const INITIAL_STATE: UserStateType = {
    currentUser: null,
    isLoggedIn: false
};

const slice = createSlice({
    name: 'userReducer',
    initialState: INITIAL_STATE,
    reducers: {
        setUserIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setCurrentUserDataAC(state, action: PayloadAction<{ currentUser: UserDataType }>) {
            state.currentUser = action.payload.currentUser;
        }
    }
});

export const userReducer = slice.reducer;
export const {setUserIsLoggedInAC, setCurrentUserDataAC} = slice.actions;