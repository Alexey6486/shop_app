import React from "react";
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/icons/bag.svg';
import {useDispatch} from "react-redux";
import {toggleCartPopUp} from "../../redux/cart/cart.reducer";

export const CartIcon = () => {

    const dispatch = useDispatch();

    const showHideCartPopUp = () => {
        dispatch(toggleCartPopUp({}))
    }

    return (
        <div className={'cart-icon'} onClick={showHideCartPopUp}>
            <ShoppingIcon className={'shopping-icon'}/>
            <span className={'item-count'}>0</span>
        </div>
    )
}