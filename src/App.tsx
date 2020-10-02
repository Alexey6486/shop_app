import React, {lazy, Suspense, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {HeaderWithRouter} from './components/header/header.component';
import {useDispatch} from "react-redux";
import {initSagaCheckUserSession} from './redux/user/user.reducer';
import {LoadingIndicator} from "./components/loading/loadingIndicator/loadingIndicator.component";

const Homepage = lazy(() => import('./pages/homepage/homepage'));
const Shop = lazy(() => import('./pages/shop/shop.component'));
const Authentication = lazy(() => import('./pages/auth/auth.component'));
const Checkout = lazy(() => import('./pages/checkout/checkout.component'));

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initSagaCheckUserSession({}));
    }, [dispatch])

    return (
        <div className="App">
            <HeaderWithRouter/>
            <Switch>
                <Suspense fallback={<LoadingIndicator/>}>
                    <Route exact path={'/'} component={Homepage}/>
                    <Route path={'/shop'} component={Shop}/>
                    <Route exact path={'/auth'} component={Authentication}/>
                    <Route exact path={'/checkout'} component={Checkout}/>
                </Suspense>
            </Switch>
        </div>
    );
}

