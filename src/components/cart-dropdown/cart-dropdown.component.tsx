import React from "react";
import './cart-dropdown.styles.scss';
import {CustomButton} from '../custom-button/custom-button.component'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {CartStateType} from "../../redux/cart/cart.reducer";
import { CartItemComponent } from "../cart-item/cart-item.component";

export const CartDropdown = () => {

    const cartState = useSelector<AppRootStateType, CartStateType>(state => state.cartReducer);
    const {cartItems} = cartState;

    const cartItemsMap = cartItems.map(item => {
        const {id} = item;
        return <CartItemComponent key={id} {...item}/>;
    });

    return (
        <div className={'cart-dropdown'}>
            <div className={'cart-items'}>
                {cartItemsMap}
            </div>
            <CustomButton>Open Cart</CustomButton>
        </div>
    )
}