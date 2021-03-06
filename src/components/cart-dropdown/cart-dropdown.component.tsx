import React from "react";
import './cart-dropdown.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {CartStateType, toggleCartPopUp} from "../../redux/cart/cart.reducer";
import { CartItemComponent } from "../cart-item/cart-item.component";
import {NavLink} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;
const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

export const CartDropdown = () => {

    const dispatch = useDispatch();

    const cartState = useSelector<AppRootStateType, CartStateType>(state => state.cartReducer);
    const {cartItems} = cartState;

    const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
    const { loading, error, data } = useQuery(GET_CART_ITEMS);

    const onClick = () => toggleCartHidden();

    const cartItemsMap = data['cartItems'].length ? data['cartItems'].map((item: any) => {
        const {id} = item;
        return <CartItemComponent key={id} {...item}/>;
    }) : [];

    return (
        <div className={'cart-dropdown'}>
            <div className={'cart-items'}>
                {data['cartItems'].length ? cartItemsMap : <div className={'cart-items__empty-message'}>Cart is empty</div>}
            </div>
            <NavLink className={'cart-dropdown__link'} to={'/checkout'} onClick={onClick}>Open Cart</NavLink>
        </div>
    )
};