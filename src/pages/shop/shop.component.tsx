import React from "react";
import './shop.styles.scss';
import {SHOP_DATA} from './shopData';
import {PreviewCollection} from "../../components/preview-collection/preview-collection.component";

export const ShopPage = () => {

    const shopDataMap = SHOP_DATA.map(({id, ...otherProps}) => {
        return (
            <PreviewCollection key={id} {...otherProps}/>
        )
    })

    return (
        <div className={'shop-page'}>
            <div className={'container'}>
                <h2 className={'shop-page__title'}>Shop page</h2>
                {shopDataMap}
            </div>
        </div>
    )
}