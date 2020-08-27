import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {ShopPage} from "./pages/shop/shop.component";
import {Homepage} from "./pages/homepage/homepage";
import { Header } from './components/header/header.component';
import {Auth} from "./pages/auth/auth.component";

export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path={'/'} component={Homepage}/>
                <Route exact path={'/shop'} component={ShopPage}/>
                <Route exact path={'/auth'} component={Auth}/>
            </Switch>
        </div>
    );
}

