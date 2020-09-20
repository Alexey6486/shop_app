import {put, takeLatest } from "redux-saga/effects";
import {clearCart, initSagaClearCart } from "./cart.reducer";

function* workerClearCart() {
    yield put(clearCart({}));
}
export function* watchClearCart() {
    yield takeLatest(initSagaClearCart, workerClearCart);
}