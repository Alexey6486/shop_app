import React from "react";
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/icons/bag.svg';
import {useDispatch} from "react-redux";
import {toggleCartPopUp} from "../../redux/cart/cart.reducer";

type PropsType = {
    amountOfGoodsInCart: number
}

export const CartIcon = (props: PropsType) => {

    const {amountOfGoodsInCart} = props;

    const dispatch = useDispatch();

    const showHideCartPopUp = () => {
        dispatch(toggleCartPopUp({}))
    }

    return (
        <div className={'cart-icon'} onClick={showHideCartPopUp}>
            <ShoppingIcon className={'shopping-icon'}/>
            <span className={'item-count'}>{amountOfGoodsInCart}</span>
        </div>
    )
}