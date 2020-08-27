import React from "react";
import { Link } from "react-router-dom";
import './header.styles.scss';

export const Header = () => {

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
                    <Link className={'link'} to={'/auth'}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}