import React, {useCallback, useMemo} from "react";
import './checkout.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {CartStateType, changeQuantity, removeItemFromCart} from "../../redux/cart/cart.reducer";
import { CheckoutItemComponent } from "../../components/checkout-item/checkout-item.component";

export const CheckoutPage= () => {

    const dispatch = useDispatch();

    const cartState = useSelector<AppRootStateType, CartStateType>(state => state.cartReducer);
    const {cartItems} = cartState;

    const removeItem = useCallback((id: number) => dispatch(removeItemFromCart({id})), [dispatch]);

    const changeAmount = useCallback((direction: 'inc' | 'dec', id: number) => dispatch(changeQuantity({direction, id})), [dispatch]);

    const reduceTotalPriceOfItems = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + (item.quantity * item.price);
        }, 0);
    }, [cartItems]);

    const cartItemsMap = cartItems.map(item => {
        const {id} = item;
        return <CheckoutItemComponent key={id} {...item} removeItem={removeItem} changeAmount={changeAmount}/>;
    });

    return (
        <div className={'checkout-page'}>
            <div className={'container'}>
                <h2 className={'checkout-page__title'}>Checkout</h2>
                <div className={'checkout-table'}>
                    <div className={'checkout-table__header'}>
                        <div className={'checkout-table__column checkout-table__column-product'}>
                            Product
                        </div>
                        <div className={'checkout-table__column checkout-table__column-description'}>
                            Description
                        </div>
                        <div className={'checkout-table__column checkout-table__column-quantity'}>
                            Quantity
                        </div>
                        <div className={'checkout-table__column checkout-table__column-price'}>
                            Price
                        </div>
                        <div className={'checkout-table__column checkout-table__column-remove'}>
                            Remove
                        </div>
                    </div>
                    <div className={'checkout-table__body'}>
                        {cartItems.length ? cartItemsMap : 'Cart is empty.'}
                    </div>
                </div>
                <div className={'checkout-total'}>
                    Total: ${reduceTotalPriceOfItems}
                </div>
            </div>
        </div>
    )
}