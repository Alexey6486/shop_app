import React from "react";
import './preview-collection.styles.scss';
import {CollectionItem} from "../collection-item/collection-item.component";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cart/cart.reducer";
import {SectionItemType} from "../../redux/shop/shop.reducer";

type PropsType = {
    title: string
    items: Array<SectionItemType>
    routeName?: string
}

export const PreviewCollectionComponent = (props: PropsType) => {

    const dispatch = useDispatch();

    const {title, items} = props;

    const itemsMap = items
        .filter((f, idx) => idx < 4)
        .map(i => {

            const onAddItem = () => {
                dispatch(addItemToCart(i));
            };

            return (
                <CollectionItem key={i.id} {...i} onAddItem={onAddItem}/>
            )
        })

    return (
        <div className={'collection-preview'}>
            <h2 className={'collection-preview__title'} data-attr={title}>{title}</h2>
            <div className={'preview'}>
                {itemsMap}
            </div>
        </div>
    )
}