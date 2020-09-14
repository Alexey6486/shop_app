import React from "react";
import './cart-dropdown.styles.scss';
import {CustomButton} from '../custom-button/custom-button.component'

export const CartDropdown = () => {

    return (
        <div className={'cart-dropdown'}>
            <div className={'cart-items'}>

            </div>
            <CustomButton>Open Cart</CustomButton>
        </div>
    )
}