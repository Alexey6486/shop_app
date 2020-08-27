import React from "react";
import {Link} from "react-router-dom";
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';

type PropsType = {
    currentUser: any
}

export const Header = (props: PropsType) => {

    const {currentUser} = props;

    return (
        <div className={'header'}>
            <div className={'container'}>
                <Link className={'link'} to={'/'}>
                    Home
                </Link>
                <div className={'nav'}>
                    <Link className={'link'} to={'/shop'}>
                        Shop
                    </Link>

                    {
                        currentUser
                            ? <div className={'link'} onClick={() => auth.signOut()}>Sign Out</div>
                            : <Link className={'link'} to={'/auth'}>Sign In</Link>
                    }

                </div>
            </div>
        </div>
    )
}