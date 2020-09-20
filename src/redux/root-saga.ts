import {all, call} from 'redux-saga/effects';
import { watchClearCart } from './cart/cart.sagas';
import {watchLoadShopData} from "./shop/shop.reducer";
import {watchCheckUserSession,
    watchSignInAfterSingUp,
    watchSignInWithEmail, watchSignInWithGoogle, watchSignOut, watchSignUp} from './user/user.sagas';

export function* rootSaga() {
    yield all([
        call(watchLoadShopData),
        call(watchSignInWithGoogle),
        call(watchSignInWithEmail),
        call(watchCheckUserSession),
        call(watchSignOut),
        call(watchClearCart),
        call(watchSignUp),
        call(watchSignInAfterSingUp),
    ]);
}
