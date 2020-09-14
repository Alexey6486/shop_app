import React from "react";
import './cart-item.styles.scss';

type PropsType = {
    name: string
    imageUrl: string
    price: number
    quantity: number
}

export const CartItemComponent = (props: PropsType) => {

    const {imageUrl, name, price, quantity} = props;

    return (
        <div className={'cart-item'}>
            <img src={imageUrl} alt={'item'}/>
            <div className={'item-details'}>
                <div className={'item-details__name'}>{name}</div>
                <div className={'item-details__quantity'}>Quantity: {quantity}</div>
                <div className={'item-details__price'}>Price: {price}</div>
            </div>
        </div>
    )
};