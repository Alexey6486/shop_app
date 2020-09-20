import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SectionItemType} from "../shop/shop.reducer";

type ChangeQuantityType = {
    direction: 'inc' | 'dec';
    id: number
}
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
        // saga init actions
        initSagaClearCart(state, action: PayloadAction<{}>) {
            return state;
        },

        // actions
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
        removeItemFromCart(state, action: PayloadAction<{ id: number }>) {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems.splice(index, 1);
        },
        changeQuantity(state, action: PayloadAction<ChangeQuantityType>) {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (action.payload.direction === 'dec') {
                if (state.cartItems[index].quantity > 1) {
                    state.cartItems[index].quantity--;
                }
            }
            if (action.payload.direction === 'inc') {
                state.cartItems[index].quantity++;
            }
        },
        clearCart(state, action: PayloadAction<{}>) {
            state.cartItems = [];
        },
    }
});

export const cartReducer = slice.reducer;
export const {toggleCartPopUp, addItemToCart, removeItemFromCart, changeQuantity, initSagaClearCart, clearCart} = slice.actions;