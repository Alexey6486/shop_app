import {call, put, takeLatest} from "redux-saga/effects";
import {
    AuthPayloadType,
    initSagaCheckUserSession,
    initSagaSignInWithEmail,
    initSagaSignInWithGoogle,
    initSagaSignOut,
    initSagaSignUp,
    setCurrentUserDataAC,
    setSignInError,
    setUserIsLoggedInAC,
    signUp,
} from "./user.reducer";
import {auth, createUserProfileDocument, getCurrentUser, googleProvider} from "../../firebase/firebase.utils";

function* getSnapshotFromUserAuth(userAuth: any, additionalData: any) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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
function* workerSignInWithEmail({payload: {email, password}}: AuthPayloadType) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user, null);
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
        yield getSnapshotFromUserAuth(user, null);
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
        yield getSnapshotFromUserAuth(userAuth, null);
    } catch (error) {
        yield put(setSignInError({error: error.message}));
    }
}

export function* watchCheckUserSession() {
    yield takeLatest(initSagaCheckUserSession, workerCheckUserSession);
}

// sign out
function* workerSignOut() {
    try {
        yield auth.signOut();
        yield put(setCurrentUserDataAC({currentUser: null}));
        yield put(setUserIsLoggedInAC({isLoggedIn: false}));
    } catch (error) {
        yield put(setSignInError({error: error.message}));
    }
}

export function* watchSignOut() {
    yield takeLatest(initSagaSignOut, workerSignOut);
}

// sign up
function* workerSignUp({payload: {email, password, displayName}}: AuthPayloadType) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUp({user, additionalData: {displayName}}));
    } catch(error) {
        yield put(setSignInError({error: error.message}));
    }
}
export function* watchSignUp() {
    yield takeLatest(initSagaSignUp, workerSignUp);
}

// listen to signUp action to be fired
function* workerSignInAfterSingUp({payload: {user, additionalData}}: any) {
    try {
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch(error) {
        yield put(setSignInError({error: error.message}));
    }
}
export function* watchSignInAfterSingUp() {
    yield takeLatest(signUp, workerSignInAfterSingUp);
}