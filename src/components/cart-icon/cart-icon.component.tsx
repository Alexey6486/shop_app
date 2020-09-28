import React from "react";
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/icons/bag.svg';
import {useDispatch} from "react-redux";
import {toggleCartPopUp} from "../../redux/cart/cart.reducer";
import {gql, useMutation} from "@apollo/client";

type PropsType = {
    inCart: number
}

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

export const CartIcon = (props: PropsType) => {

    const {inCart} = props;

    const dispatch = useDispatch();

    const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);

    const showHideCartPopUp = () => {
        toggleCartHidden();
        //dispatch(toggleCartPopUp({}))
    }

    return (
        <div className={'cart-icon'} onClick={showHideCartPopUp}>
            <ShoppingIcon className={'shopping-icon'}/>
            <span className={'item-count'}>{inCart}</span>
        </div>
    )
}