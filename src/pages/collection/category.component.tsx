import React from "react";
import './category.styles.scss';
import {RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {ShopDataType} from "../../redux/shop/shop.reducer";
import {addItemToCart} from "../../redux/cart/cart.reducer";
import {CollectionItem} from "../../components/collection-item/collection-item.component";
import {gql, useQuery} from "@apollo/client";
import {LoadingWrapComponent} from "../../components/loading/loadingIndicator/loadingIndicator.styles";

type RoutePropsType = {
    collectionId: string
};
type PropsType = RouteComponentProps<RoutePropsType> & {

};
const COLLECTIONS_ITEMS_GRAPHQL = gql`
        query getCollectionsByTitle($title: String!) {
            getCollectionsByTitle(title: $title) {
                id
                title
                items {
                    id
                    name
                    price
                    imageUrl
                }
            }
        }
    `;

export const CollectionPage = (props: PropsType) => {

    const dispatch = useDispatch();

    // const shopState = useSelector<AppRootStateType, ShopDataType>(state => state.shopReducer);
    // const {collections} = shopState;

    const {match} = props;

    // const selectCollection = collections[match.params.collectionId];

    //const selectCollection = shopState.find(collection => collection.id === COLLECTIONS_ID_MAP[match.params.collectionId]);

    const { loading, error, data } = useQuery(COLLECTIONS_ITEMS_GRAPHQL, {
        variables: { title: match.params.collectionId },
    });

    if (loading) return <LoadingWrapComponent/>;
    if (error) return <p>This page currently is unavailable. Work in progress...</p>;

    const collectionTitle = data ? data['getCollectionsByTitle'].title : '';
    const collectionItems = data ? data['getCollectionsByTitle'].items : [];

    const itemsMap = collectionItems ? collectionItems.map((i: any) => {
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