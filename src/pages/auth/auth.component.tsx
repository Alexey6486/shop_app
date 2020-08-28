import React from "react";
import './auth.styles.scss';
import {SignIn} from "../../components/auth/sign-in/sing-in.component";
import {SignUp} from "../../components/auth/sign-up/sing-up.component";

export const Auth = () => {

    return (
        <div className={'auth'}>
            <div className={'container'}>
                <SignIn/>
                <SignUp/>
            </div>
        </div>
    )
}