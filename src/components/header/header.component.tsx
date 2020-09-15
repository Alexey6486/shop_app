import React, {useMemo} from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {UserStateType} from "../../redux/user/user.reducer";
import {CartIcon} from "../cart-icon/cart-icon.component";
import {CartDropdown} from "../cart-dropdown/cart-dropdown.component";
import {CartStateType} from "../../redux/cart/cart.reducer";

type PropsType = RouteComponentProps & {}

const Header = (props: PropsType) => {

    const {history} = props;

    const authState = useSelector<AppRootStateType, UserStateType>(state => state.userReducer);
    const {isLoggedIn} = authState;

    const cartState = useSelector<AppRootStateType, CartStateType>(state => state.cartReducer);
    const {showCartPopUp, cartItems} = cartState;

    const currentUrl = history.location.pathname;

    const reduceTotalAmountOfItems = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
    }, [cartItems]);

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
                            : <Link className={`${currentUrl === '/auth' ? 'link active' : 'link'}`} to={'/auth'}>Sign
                                In</Link>
                    }
                    <CartIcon inCart={reduceTotalAmountOfItems}/>
                </div>
                {showCartPopUp && <CartDropdown/>}
            </div>
        </div>
    )
}

export const HeaderWithRouter = withRouter(Header);