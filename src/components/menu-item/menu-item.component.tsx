import React from "react";
import './menu-items.styles.scss';

type PropsType = {
    title: string
    styleMod: string
    imgUrl: string
}

export const MenuItem = (props: PropsType) => {

    const {title, styleMod, imgUrl} = props;

    return (
        <div className={`menu-item ${styleMod}`}>
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