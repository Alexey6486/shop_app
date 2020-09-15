import React from "react";
import './shop.styles.scss';
import {CollectionsOverviewComponent} from "../../components/collections-overview/collections-overview.component";
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {CollectionPage} from "../collection/category.component";

type RoutePropsType = {

};
type PropsType = RouteComponentProps<RoutePropsType> & {

};

const ShopPage = (props: PropsType) => {

    const {match} = props;

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