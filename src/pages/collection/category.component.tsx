import React from "react";
import './category.styles.scss';
import {RouteComponentProps} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {COLLECTIONS_ID_MAP, ShopDataType} from "../../redux/shop/shop.reducer";
import {PreviewCollectionComponent} from "../../components/preview-collection/preview-collection.component";

type RoutePropsType = {
    collectionId: string
};
type PropsType = RouteComponentProps<RoutePropsType> & {

};

export const CollectionPage = (props: PropsType) => {

    const shopState = useSelector<AppRootStateType, ShopDataType>(state => state.shopReducer);

    const {match} = props;

    const selectCollection = shopState.find(collection => collection.id === COLLECTIONS_ID_MAP[match.params.collectionId]);

    const collectionTitle = selectCollection ? selectCollection.title : '';
    const collectionItems = selectCollection ? selectCollection.items : [];
    const collectionItemsMap = <PreviewCollectionComponent title={collectionTitle} items={collectionItems}/>;

    return (
        <div className={'category'}>
            {collectionItemsMap}
        </div>
    )
};