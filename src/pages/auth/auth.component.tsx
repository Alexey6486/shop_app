import React from "react";
import './auth.styles.scss';
import {SignIn} from "../../components/auth/sign-in/sing-in.component";
import {SignUp} from "../../components/auth/sign-up/sing-up.component";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {UserStateType} from "../../redux/user/user.reducer";
import { Redirect } from "react-router-dom";

const Auth = () => {

    const authState = useSelector<AppRootStateType, UserStateType>(state => state.userReducer);
    const {isLoggedIn} = authState;

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={'auth'}>
            <div className={'container'}>
                <SignIn/>
                <SignUp/>
            </div>
        </div>
    )
}

export default Auth;