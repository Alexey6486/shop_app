import React from "react";
import './collections-overview.styles.scss';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {ShopDataType} from "../../redux/shop/shop.reducer";
import {PreviewCollectionComponent} from "../preview-collection/preview-collection.component";
import {gql, useQuery} from "@apollo/client";
import {LoadingWrapComponent} from "../loading/loadingIndicator/loadingIndicator.styles";

const COLLECTIONS_GRAPHQL = gql`
        {
            collections {
                id
                title
                items {
                    id
                    imageUrl
                    name
                    price
                }
            }
        }
    `;

export const CollectionsOverviewComponent = () => {

    // const shopState = useSelector<AppRootStateType, ShopDataType>(state => state.shopReducer);
    // const {collections} = shopState;

    // let shopDataArr = [];
    // for (let i in shopState) {
    //     shopDataArr.push(shopState[i]);
    // }
    // const shopDataMap = shopDataArr.map(({id, ...otherProps}) => {
    //     return <PreviewCollectionComponent key={id} {...otherProps}/>
    // });

    //console.log(Object.keys(shopState).map(i => shopState[i]))

    const { loading, error, data } = useQuery(COLLECTIONS_GRAPHQL);

    if (loading) return <LoadingWrapComponent/>;
    if (error) return <p>This page currently is unavailable. Work in progress...</p>;

    const shopDataMap = data.collections ? Object.keys(data.collections)
        .map(i => data.collections[i])
        .map(({id, ...otherProps}) => {
            return <PreviewCollectionComponent key={id} {...otherProps}/>
        }) : [];

    return (
        <div className={'collections-overview'}>
            {shopDataMap}
        </div>
    )
}