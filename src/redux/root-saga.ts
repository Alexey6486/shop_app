import {all, call} from 'redux-saga/effects';
import {watchLoadShopData} from "./shop/shop.reducer";
import {watchCheckUserSession, watchSignInWithEmail, watchSignInWithGoogle} from './user/user.sagas';

export function* rootSaga() {
    yield all([
        call(watchLoadShopData),
        call(watchSignInWithGoogle),
        call(watchSignInWithEmail),
        call(watchCheckUserSession),
    ]);
}
