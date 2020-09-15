import React from "react";
import {MenuItemWithRouter} from "../menu-item/menu-item.component";
import './directory.styles.scss';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/root-reducers";

type GoodsItemType = {
    title: string
    id: string
    imgUrl: string
    linkUrl: string
};
type DirectoryStateType = Array<GoodsItemType>;

export const Directory = () => {

    const directoryState = useSelector<AppRootStateType, DirectoryStateType>(state => state.directoryReducer);

    const goodsMap = directoryState.map(({id, ...otherProps}, index) => {
        return <MenuItemWithRouter key={id} {...otherProps} styleMod={index <= 2 ? 'small' : 'large'}/>
    })

    return (
        <div className={'directory-menu'}>
            {goodsMap}
        </div>
    );
}

