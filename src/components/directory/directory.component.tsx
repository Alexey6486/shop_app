import React from "react";
import {MenuItem} from "../menu-item/menu-item.component";
import './directory.styles.scss';
import imgBg from '../../assets/img/imgBg.jpg';

type GoodsItemType = {
    title: string
    id: string
    imgUrl: string
};
type DirectoryStateType = Array<GoodsItemType>;

export const Directory = () => {

    const directoryState: DirectoryStateType = [
        {title: 'Goods', id: '', imgUrl: imgBg,},
        {title: 'Goods', id: '', imgUrl: imgBg,},
        {title: 'Goods', id: '', imgUrl: imgBg,},
        {title: 'Goods', id: '', imgUrl: imgBg,},
        {title: 'Goods', id: '', imgUrl: imgBg,},
    ]

    const goodsMap = directoryState.map(({title, id, imgUrl}, index) => {
        return <MenuItem key={id} title={title} imgUrl={imgUrl} styleMod={index <= 2 ? 'small' : 'large'}/>
    })

    return (
        <div className={'directory-menu'}>
            {goodsMap}
        </div>
    );
}