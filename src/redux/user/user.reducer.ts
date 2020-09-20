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
    error: string | null
};

const INITIAL_STATE: UserStateType = {
    currentUser: null,
    isLoggedIn: false,
    error: null,
};

const slice = createSlice({
    name: 'userReducer',
    initialState: INITIAL_STATE,
    reducers: {
        initSagaSignInWithEmail(state, action: PayloadAction<{ email: string, password: string }>) {
            return state;
        },
        initSagaSignInWithGoogle(state, action: PayloadAction<{}>) {
            return state;
        },
        setCurrentUserDataAC(state, action: PayloadAction<{ currentUser: UserDataType }>) {
            state.currentUser = action.payload.currentUser;
        },
        setSignInError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setUserIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    }
});

export const userReducer = slice.reducer;
export const {
    setUserIsLoggedInAC, setCurrentUserDataAC, setSignInError, initSagaSignInWithEmail,
    initSagaSignInWithGoogle,
} = slice.actions;