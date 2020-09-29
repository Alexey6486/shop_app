import React, {useMemo} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import './header.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";
import {initSagaSignOut, UserStateType} from "../../redux/user/user.reducer";
import {CartIcon} from "../cart-icon/cart-icon.component";
import {CartDropdown} from "../cart-dropdown/cart-dropdown.component";
import {CartStateType, initSagaClearCart} from "../../redux/cart/cart.reducer";
import {HeaderContainer, HeaderFrame, LinkContainer, NavContainer} from "./header.styles";
import {gql, useQuery} from "@apollo/client";
import {client} from "../../index";

type PropsType = RouteComponentProps & {}

const GET_CART_DATA = gql`
    {
        cartHidden @client
        cartItems @client
    }
`;


const Header = (props: PropsType) => {

    const dispatch = useDispatch();

    const {history} = props;

    const authState = useSelector<AppRootStateType, UserStateType>(state => state.userReducer);
    const {isLoggedIn} = authState;

    // const cartState = useSelector<AppRootStateType, CartStateType>(state => state.cartReducer);
    // const {showCartPopUp, cartItems} = cartState;

    const { loading, error, data } = useQuery(GET_CART_DATA);

    const currentUrl = history.location.pathname;

    const onSignOut = () => dispatch(initSagaSignOut({}));

    const cartItems = data['cartItems'].length ? data['cartItems'] : [];

    const reduceTotalAmountOfItems = useMemo(() => {
        return cartItems.reduce((acc: any, item: any) => {
            return acc + item.quantity;
        }, 0);
    }, [cartItems]);


    const active = (curUrl: string, linkUrl: string) => curUrl === linkUrl ? 'true' : 'false';

    return (
        <HeaderContainer>
            <HeaderFrame>
                <LinkContainer active={active(currentUrl, '/')} to={'/'}>
                    Home
                </LinkContainer>
                <NavContainer>
                    <LinkContainer active={active(currentUrl, '/shop')} to={'/shop'}>
                        Shop
                    </LinkContainer>
                    {
                        isLoggedIn
                            ? <LinkContainer as={'div'} onClick={onSignOut}>Sign Out</LinkContainer>
                            : <LinkContainer active={active(currentUrl, '/auth')} to={'/auth'}>Sign In</LinkContainer>
                    }
                    <CartIcon inCart={reduceTotalAmountOfItems}/>
                </NavContainer>
                {!data.cartHidden && <CartDropdown/>}
            </HeaderFrame>
        </HeaderContainer>
    )
}

export const HeaderWithRouter = withRouter(Header);