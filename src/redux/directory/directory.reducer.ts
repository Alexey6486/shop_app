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
    {title: 'hats', id: '1', imgUrl: imgBg, linkUrl: 'shop/hats'},
    {title: 'sneakers', id: '2', imgUrl: imgBg, linkUrl: 'shop/sneakers'},
    {title: 'jackets', id: '3', imgUrl: imgBg, linkUrl: 'shop/jackets'},
    {title: 'womens', id: '4', imgUrl: imgBg_large, linkUrl: 'shop/womens'},
    {title: 'mens', id: '5', imgUrl: imgBg_large, linkUrl: 'shop/mens'},
];

const slice = createSlice({
    name: 'directoryReducer',
    initialState: INITIAL_STATE,
    reducers: {}
});

export const directoryReducer = slice.reducer;
export const {} = slice.actions;