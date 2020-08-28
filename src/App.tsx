import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {ShopPage} from "./pages/shop/shop.component";
import {Homepage} from "./pages/homepage/homepage";
import {HeaderWithRouter} from './components/header/header.component';
import {Auth} from "./pages/auth/auth.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

export const App = () => {

    const [currentUser, setCurrentUser] = useState<any>(null);
    console.log(currentUser)
    // checking if a user is authorized
    useEffect(() => {
        auth.onAuthStateChanged( async userAuth => {
            //console.log(userAuth)
            //setCurrentUser(userAuth);
            if (userAuth) {
                // we return userRef from the function and here we create const to keep it there because we are
                // going to use to check if our data base is updated with any new data
                const userRef = await createUserProfileDocument(userAuth);

                if (userRef) {
                    // getting the snapshot of a user data applying .data, however there is no id in the response object
                    // to get id use snapShot.id
                    userRef.onSnapshot(snapShot => {
                        //console.log(snapShot.data());
                        setCurrentUser({id: snapShot.id, ...snapShot.data()})
                    })
                }
            }
            setCurrentUser(userAuth);
        });

        return () => {
            //unsubscribeFromAuth();
        }
    }, [])

    return (
        <div className="App">
            <HeaderWithRouter currentUser={currentUser}/>
            <Switch>
                <Route exact path={'/'} component={Homepage}/>
                <Route exact path={'/shop'} component={ShopPage}/>
                <Route exact path={'/auth'} component={Auth}/>
            </Switch>
        </div>
    );
}

