import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';

type PropsType = RouteComponentProps & {
    currentUser: any
}


const Header = (props: PropsType) => {

    const {currentUser, history} = props;

    const currentUrl = history.location.pathname;

    return (
        <div className={'header'}>
            <div className={'container'}>
                <Link className={`${currentUrl === '/' ? 'link active' : 'link'}`} to={'/'}>
                    Home
                </Link>
                <div className={'nav'}>
                    <Link className={`${currentUrl === '/shop' ? 'link active' : 'link'}`} to={'/shop'}>
                        Shop
                    </Link>

                    {
                        currentUser
                            ? <div className={'link'} onClick={() => auth.signOut()}>Sign Out</div>
                            : <Link className={`${currentUrl === '/auth' ? 'link active' : 'link'}`} to={'/auth'}>Sign In</Link>
                    }

                </div>
            </div>
        </div>
    )
}

export const HeaderWithRouter = withRouter(Header);