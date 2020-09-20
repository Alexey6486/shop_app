import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {ShopPageWithRouter} from "./pages/shop/shop.component";
import {Homepage} from "./pages/homepage/homepage";
import {HeaderWithRouter} from './components/header/header.component';
import {Auth} from "./pages/auth/auth.component";
import {useDispatch} from "react-redux";
import {CheckoutPage} from "./pages/checkout/checkout.component";
import { initSagaCheckUserSession } from './redux/user/user.reducer';

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initSagaCheckUserSession({}));
    }, [])

    return (
        <div className="App">
            <HeaderWithRouter/>
            <Switch>
                <Route exact path={'/'} component={Homepage}/>
                <Route path={'/shop'} component={ShopPageWithRouter}/>
                <Route exact path={'/auth'} component={Auth}/>
                <Route exact path={'/checkout'} component={CheckoutPage}/>
            </Switch>
        </div>
    );
}

