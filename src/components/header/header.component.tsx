import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';
import {useSelector} from "react-redux";
import { AppRootStateType } from "../../redux/root-reducers";
import { UserStateType } from "../../redux/user/user.reducer";

type PropsType = RouteComponentProps & {

}

const Header = (props: PropsType) => {

    const {history} = props;

    const authState = useSelector<AppRootStateType, UserStateType>(state => state.userReducer);
    const {isLoggedIn} = authState;

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
                        isLoggedIn
                            ? <div className={'link'} onClick={() => auth.signOut()}>Sign Out</div>
                            : <Link className={`${currentUrl === '/auth' ? 'link active' : 'link'}`} to={'/auth'}>Sign In</Link>
                    }

                </div>
            </div>
        </div>
    )
}

export const HeaderWithRouter = withRouter(Header);