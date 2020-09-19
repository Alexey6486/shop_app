import React, {useEffect} from "react";
import './shop.styles.scss';
import {CollectionsOverviewComponent} from "../../components/collections-overview/collections-overview.component";
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {CollectionPage} from "../collection/category.component";
import {useDispatch, useSelector} from "react-redux";
import {getShopDataTC, initSagaLoadShopData, ShopDataType} from "../../redux/shop/shop.reducer";
import {AppRootStateType} from "../../redux/root-reducers";
import {WithSpinner} from "../../components/loading/loading.component";

type RoutePropsType = {};
type PropsType = RouteComponentProps<RoutePropsType> & {};

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverviewComponent);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props: PropsType) => {

    const dispatch = useDispatch();

    const shopState = useSelector<AppRootStateType, ShopDataType>(state => state.shopReducer);
    const {isLoading} = shopState;

    const {match} = props;

    useEffect(() => {

        // const collectionRef = firestore.collection('collections');
        // const unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
        //     // console.log(snapshot);
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log(collectionsMap);
        //     dispatch(getShopData(collectionsMap));
        //     dispatch(isLoadingData({isLoading: false}));
        // });

        //dispatch(getShopDataTC());
        dispatch(initSagaLoadShopData({}));

    }, [])

    return (
        <div className={'shop-page'}>
            <div className={'container'}>
                <h2 className={'shop-page__title'}>Shop page</h2>
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props}/>}/>
            </div>
        </div>
    )
};

export const ShopPageWithRouter = withRouter(ShopPage);