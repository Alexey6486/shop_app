import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {AppRootStateType} from "../root-reducers";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {takeEvery, put, call} from 'redux-saga/effects';

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
        initSagaLoadShopData(state, action: PayloadAction<{}>) {
            return state;
        },
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
export const {getShopData, isLoadingData, setError, initSagaLoadShopData} = slice.actions;

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

////////
// saga - function that conditionally runs, depends on whether specific action comes in to (in our case it is loadData)
// we watch this loadData action in watchLoadData and when watcher hears the action it fires workerLoadData
// watchers - takes action (initSagaLoadShopData) to observe, when it fires somewhere in the code,
// watcher invokes worker (workerLoadShopData)

function fetchData() {
    const collectionRef = firestore.collection('collections');
    return collectionRef.get().then(snapshot => convertCollectionsSnapshotToMap(snapshot));
}

// after each yield saga checks if there watchLoadShopData fires again
// if user make action that fires watchLoadShopData and while it is running user fires watchLoadShopData again
// saga will stop running current workerLoadShopData and will start to run it over again - the most recent call
// yield - we yield control back to the saga each time yield runs
function* workerLoadShopData() {
    yield put(isLoadingData({isLoading: true}));

    // const data = yield call(fetchData);

    try {

        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(getShopData(collectionsMap));

    } catch(error) {

        yield put(setError({error: error.message}));

    }

    yield put(isLoadingData({isLoading: false}));
}
// takeEvery - create an none blocking call in order to not stop our application to continue running other sagas
// or whatever else in our app, it doesn't pause js
export function* watchLoadShopData() {
    yield takeEvery(initSagaLoadShopData, workerLoadShopData);
}

