import React from "react";
import './cart-dropdown.styles.scss';
import {CustomButton} from '../custom-button/custom-button.component'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {CartStateType} from "../../redux/cart/cart.reducer";

export const CartDropdown = () => {

    const cartState = useSelector<AppRootStateType, CartStateType>(state => state.cartReducer);
    const {showCartPopUp} = cartState;

    const toggleClass = showCartPopUp ? 'cart-dropdown open' : 'cart-dropdown';
    return (
        <div className={toggleClass}>
            <div className={'cart-items'}>

            </div>
            <CustomButton>Open Cart</CustomButton>
        </div>
    )
}