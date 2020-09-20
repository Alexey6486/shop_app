import {call, put, takeLatest} from "redux-saga/effects";
import {
    checkUserSession,
    initSagaSignInWithEmail,
    initSagaSignInWithGoogle,
    setCurrentUserDataAC,
    setSignInError,
    setUserIsLoggedInAC,
} from "./user.reducer";
import {auth, createUserProfileDocument, getCurrentUser, googleProvider} from "../../firebase/firebase.utils";

function* getSnapshotFromUserAuth(userAuth: any) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(setCurrentUserDataAC({
            currentUser:
                {
                    id: userSnapshot.id,
                    ...userSnapshot.data(),
                    createdAt: {
                        seconds: userSnapshot.data().createdAt.seconds,
                        nanoseconds: userSnapshot.data().createdAt.nanoseconds
                    },
                }
        }));
        yield put(setUserIsLoggedInAC({isLoggedIn: true}));
    } catch (error) {
        yield put(setSignInError({error: error.message}));
    }
}

// sign in with email
function* workerSignInWithEmail({payload: {email, password}}: any) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(setSignInError({error: error.message}));
    }
}

export function* watchSignInWithEmail() {
    yield takeLatest(initSagaSignInWithEmail, workerSignInWithEmail);
}

// sign in with google
function* workerSignInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(setSignInError({error: error.message}));
    }
}

export function* watchSignInWithGoogle() {
    yield takeLatest(initSagaSignInWithGoogle, workerSignInWithGoogle);
}

// check user session
function* workerCheckUserSession() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(setSignInError({error: error.message}));
    }
}

export function* watchCheckUserSession() {
    yield takeLatest(checkUserSession, workerCheckUserSession);
}