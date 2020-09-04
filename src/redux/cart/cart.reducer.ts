import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type CartStateType = {
    showCartPopUp: boolean
};

const INITIAL_STATE: CartStateType = {
    showCartPopUp: false
};

const slice = createSlice({
    name: 'cartReducer',
    initialState: INITIAL_STATE,
    reducers: {
        toggleCartPopUp(state, action: PayloadAction<{}>) {
            state.showCartPopUp = !state.showCartPopUp;
        }
    }
});

export const cartReducer = slice.reducer;
export const {toggleCartPopUp} = slice.actions;