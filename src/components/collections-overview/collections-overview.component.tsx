import React from "react";
import './collections-overview.styles.scss';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {ShopDataType} from "../../redux/shop/shop.reducer";
import {PreviewCollectionComponent} from "../preview-collection/preview-collection.component";

export const CollectionsOverviewComponent = () => {

    const shopState = useSelector<AppRootStateType, ShopDataType>(state => state.shopReducer);

    const shopDataMap = shopState.map(({id, ...otherProps}) => {
        return <PreviewCollectionComponent key={id} {...otherProps}/>
    });

    return (
        <div className={'collections-overview'}>
            {shopDataMap}
        </div>
    )
}