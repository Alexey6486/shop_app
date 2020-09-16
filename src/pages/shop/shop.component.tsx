import React, {useEffect} from "react";
import './shop.styles.scss';
import {CollectionsOverviewComponent} from "../../components/collections-overview/collections-overview.component";
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {CollectionPage} from "../collection/category.component";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {getShopData, ShopDataType} from "../../redux/shop/shop.reducer";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";

type RoutePropsType = {

};
type PropsType = RouteComponentProps<RoutePropsType> & {

};

const ShopPage = (props: PropsType) => {

    const dispatch = useDispatch();

    //const shopState = useSelector<AppRootStateType, ShopDataType>(state => state.shopReducer);

    const {match} = props;

    useEffect(() => {

        const collectionRef = firestore.collection('collections');
        const unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
            //console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            //onsole.log(collectionsMap);
            dispatch(getShopData(collectionsMap));
        });

    }, [])

    return (
        <div className={'shop-page'}>
            <div className={'container'}>
                <h2 className={'shop-page__title'}>Shop page</h2>
                <Route exact path={`${match.path}`} component={CollectionsOverviewComponent}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        </div>
    )
};

export const ShopPageWithRouter = withRouter(ShopPage);