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
export type AuthDataType = {
    email: string
    password: string
    displayName?: string
}
export type AuthPayloadType = {
    payload: AuthDataType
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
        // saga init actions
        initSagaSignInWithEmail(state, action: PayloadAction<AuthDataType>) {
            return state;
        },
        initSagaSignInWithGoogle(state, action: PayloadAction<{}>) {
            return state;
        },
        initSagaCheckUserSession(state, action: PayloadAction<{}>) {
            return state;
        },
        initSagaSignOut(state, action: PayloadAction<{}>) {
            return state;
        },
        initSagaSignUp(state, action: PayloadAction<AuthDataType>) {
            return state;
        },

        // actions
        setCurrentUserDataAC(state, action: PayloadAction<{ currentUser: UserDataType }>) {
            state.currentUser = action.payload.currentUser;
        },
        setSignInError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setUserIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        signUp(state, action: PayloadAction<{ user: any, additionalData: any }>) {
            return state;
        },
    }
});

export const userReducer = slice.reducer;
export const {
    setUserIsLoggedInAC, setCurrentUserDataAC, setSignInError, initSagaSignInWithEmail,
    initSagaSignInWithGoogle, initSagaCheckUserSession, initSagaSignOut, initSagaSignUp, signUp,
} = slice.actions;