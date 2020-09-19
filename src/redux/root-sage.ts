import {all, call} from 'redux-saga/effects';
import {watchLoadShopData} from "./shop/shop.reducer";

export function* rootSaga() {
    yield all([
        call(watchLoadShopData),
    ])
}
