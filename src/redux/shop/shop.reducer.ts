import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {AppRootStateType} from "../root-reducers";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";

export type SectionItemType = {
    id: number
    name: string
    imageUrl: string
    price: number
};
export type ShopSectionType = {
    id: number
    title: string
    routeName: string
    items: Array<SectionItemType>
};
export interface CollectionsType extends Record<string, any> {
    [key: string]: ShopSectionType
}
export type ShopDataType = {
    collections: CollectionsType
    isLoading: boolean
    error: string | null
};

const INITIAL_STATE: ShopDataType = {
    collections: {},
    isLoading: true,
    error: null,
};

const slice = createSlice({
    name: 'shopReducer',
    initialState: INITIAL_STATE,
    reducers: {
        getShopData(state, action: PayloadAction<CollectionsType>) {
            state.collections = action.payload;
        },
        isLoadingData(state, action: PayloadAction<{isLoading: boolean}>) {
            state.isLoading = action.payload.isLoading;
        },
        setError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error;
        },
    }
});

export const shopReducer = slice.reducer;
export const {getShopData, isLoadingData, setError} = slice.actions;

export const getShopDataTC = () => (dispatch: ThunkDispatch<AppRootStateType, {}, any>) => {
    dispatch(isLoadingData({isLoading: true}));
    const collectionRef = firestore.collection('collections');
    collectionRef.get()
        .then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(getShopData(collectionsMap));
            dispatch(isLoadingData({isLoading: false}));
        })
        .catch(error => dispatch(setError({error: error.message})))
}