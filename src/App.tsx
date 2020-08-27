import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {ShopPage} from "./pages/shop/shop.component";
import {Homepage} from "./pages/homepage/homepage";
import {Header} from './components/header/header.component';
import {Auth} from "./pages/auth/auth.component";
import {auth} from './firebase/firebase.utils';

export const App = () => {

    const [currentUser, setCurrentUser] = useState<any>(null);

    // проверка авторизации пользователя
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log(user)
        });

        return () => {
            //unsubscribeFromAuth();
        }
    }, [])

    return (
        <div className="App">
            <Header currentUser={currentUser}/>
            <Switch>
                <Route exact path={'/'} component={Homepage}/>
                <Route exact path={'/shop'} component={ShopPage}/>
                <Route exact path={'/auth'} component={Auth}/>
            </Switch>
        </div>
    );
}

