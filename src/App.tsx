import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {ShopPageWithRouter} from "./pages/shop/shop.component";
import {Homepage} from "./pages/homepage/homepage";
import {HeaderWithRouter} from './components/header/header.component';
import {Auth} from "./pages/auth/auth.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUserDataAC, setUserIsLoggedInAC} from './redux/user/user.reducer';
import {useDispatch} from "react-redux";
import {CheckoutPage} from "./pages/checkout/checkout.component";

export const App = () => {

    const dispatch = useDispatch();
    //const [currentUser, setCurrentUser] = useState<any>(null);
    // checking if a user is authorized
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                // we return userRef from the function and here we create const to keep it there because we are
                // going to use to check if our data base is updated with any new data
                const userRef = await createUserProfileDocument(userAuth);

                if (userRef) {
                    // getting the snapshot of a user data applying .data, however there is no id in the response object
                    // to get id use snapShot.id
                    userRef.onSnapshot(snapShot => {
                        //console.log(snapShot.data());
                        //console.log({id: snapShot.id, ...snapShot.data()});
                        const userData = snapShot.data();
                        if (userData) {
                            const {displayName, email, createdAt} = userData;
                            dispatch(setCurrentUserDataAC({
                                currentUser: {
                                    id: snapShot.id,
                                    displayName,
                                    email,
                                    createdAt: {seconds: createdAt.seconds, nanoseconds: createdAt.nanoseconds}
                                }
                            }))
                        }

                        dispatch(setUserIsLoggedInAC({isLoggedIn: true}))
                    })
                }
            }
            dispatch(setCurrentUserDataAC({currentUser: null}));
            dispatch(setUserIsLoggedInAC({isLoggedIn: false}));
        });

        return () => {
            unsubscribe();
        }
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

