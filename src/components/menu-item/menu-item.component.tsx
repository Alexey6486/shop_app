import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import './menu-items.styles.scss';

type WithRouterPropsType = {

}
type ParentPropsType = {
    title: string
    styleMod: string
    imgUrl: string
    linkUrl: string
}
type PropsType = RouteComponentProps<WithRouterPropsType> & ParentPropsType;

const MenuItem = (props: PropsType) => {
    //console.log(props)
    const {title, styleMod, imgUrl, linkUrl} = props;

    return (
        <div className={`menu-item ${styleMod}`} onClick={() => props.history.push(`${props.match.url}${linkUrl}`)}>
            <div className={'menu-item__inner'}>
                <div className={'menu-item__inner-bg'} style={{background: `url(${imgUrl})`}}></div>
                <div className={'content'}>
                    <h2 className={'title'}>
                        {title}
                    </h2>
                    <p className={'subtitle'}>
                        shop now
                    </p>
                </div>
            </div>
        </div>
    );
}

export const MenuItemWithRouter = withRouter(MenuItem);