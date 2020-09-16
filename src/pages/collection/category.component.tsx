import React from "react";
import './category.styles.scss';
import {RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {ShopDataType} from "../../redux/shop/shop.reducer";
import {addItemToCart} from "../../redux/cart/cart.reducer";
import {CollectionItem} from "../../components/collection-item/collection-item.component";

type RoutePropsType = {
    collectionId: string
};
type PropsType = RouteComponentProps<RoutePropsType> & {

};

export const CollectionPage = (props: PropsType) => {

    const dispatch = useDispatch();

    const shopState = useSelector<AppRootStateType, ShopDataType>(state => state.shopReducer);
    const {collections} = shopState;

    const {match} = props;

    const selectCollection = collections[match.params.collectionId];
    //const selectCollection = shopState.find(collection => collection.id === COLLECTIONS_ID_MAP[match.params.collectionId]);

    const collectionTitle = selectCollection ? selectCollection.title : '';
    const collectionItems = selectCollection ? selectCollection.items : [];

    const itemsMap = collectionItems ? collectionItems.map(i => {
            const onAddItem = () => dispatch(addItemToCart(i));
            return <CollectionItem key={i.id} {...i} onAddItem={onAddItem}/>
        }) : null;

    return (
        <div className={'category'}>
            <h2 className={'shop-page__collection-title'}>{collectionTitle} collection:</h2>
            <div className={'collection-items'}>
                {itemsMap}
            </div>
        </div>
    )
};