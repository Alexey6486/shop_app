import React from "react";
import {SectionItemType} from "../../pages/shop/shopData";
import './collection-item.styles.scss';

type PropsType = SectionItemType & {
    onAddItem: () => void
};

export const CollectionItem = (props: PropsType) => {

    const {id, imageUrl, name, price, onAddItem} = props;

    const onAddItemHandler = () => {
        onAddItem();
    };

    return (
        <div className={'collection-item-wrap'}>
            <div className={'collection-item'} style={{backgroundImage: `url(${imageUrl})`}}>
                <div className={'collection-item__name'}>{name}</div>
                <div className={'collection-item__link'} onClick={onAddItemHandler}>Add to cart</div>
                <div className={'collection-item__price'}>${price}</div>
            </div>
        </div>
    )
}