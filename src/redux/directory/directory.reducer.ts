import { createSlice } from "@reduxjs/toolkit";
import imgBg from "../../assets/img/imgBg.jpg";
import imgBg_large from "../../assets/img/imgBg_large.jpg";

type GoodsItemType = {
    title: string
    id: string
    imgUrl: string
    linkUrl: string
};
type DirectoryStateType = Array<GoodsItemType>;

const INITIAL_STATE: DirectoryStateType = [
    {title: 'Goods_01', id: '1', imgUrl: imgBg, linkUrl: 'goods_01'},
    {title: 'Goods_02', id: '2', imgUrl: imgBg, linkUrl: 'goods_02'},
    {title: 'Goods_03', id: '3', imgUrl: imgBg, linkUrl: 'goods_03'},
    {title: 'Goods_04', id: '4', imgUrl: imgBg_large, linkUrl: 'goods_04'},
    {title: 'Goods_05', id: '5', imgUrl: imgBg_large, linkUrl: 'goods_05'},
];

const slice = createSlice({
    name: 'directoryReducer',
    initialState: INITIAL_STATE,
    reducers: {}
});

export const directoryReducer = slice.reducer;
export const {} = slice.actions;