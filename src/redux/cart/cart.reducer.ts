import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SectionItemType} from "../../pages/shop/shopData";

type SectionItemInCartType = SectionItemType & {
    quantity: number
};

export type CartStateType = {
    showCartPopUp: boolean
    cartItems: Array<SectionItemInCartType>
};

const INITIAL_STATE: CartStateType = {
    showCartPopUp: false,
    cartItems: [],
};

const slice = createSlice({
    name: 'cartReducer',
    initialState: INITIAL_STATE,
    reducers: {
        toggleCartPopUp(state, action: PayloadAction<{}>) {
            state.showCartPopUp = !state.showCartPopUp;
        },
        addItemToCart(state, action: PayloadAction<SectionItemType>) {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (index === -1) {
                const itemToCart = {...action.payload, quantity: 1};
                state.cartItems.push(itemToCart);
            } else {
                state.cartItems[index].quantity++;
            }
        },
    }
});

export const cartReducer = slice.reducer;
export const {toggleCartPopUp, addItemToCart} = slice.actions;