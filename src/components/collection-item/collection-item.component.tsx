import React from "react";
import {SectionItemType} from "../../pages/shop/shopData";
import './collection-item.styles.scss';

type PropsType = SectionItemType;

export const CollectionItem = (props: PropsType) => {

    const {id, imageUrl, name, price} = props;

    return (
        <div className={'collection-item-wrap'}>
            <div className={'collection-item'} style={{backgroundImage: `url(${imageUrl})`}}>
                <div className={'collection-item__name'}>{name}</div>
                <div className={'collection-item__link'}>Add to cart</div>
                <div className={'collection-item__price'}>${price}</div>
            </div>
        </div>
    )
}