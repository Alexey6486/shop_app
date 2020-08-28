import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBtSyWSL3XSprJEirT0ZGWktsjBNR-2JoE",
    authDomain: "shop-f01e1.firebaseapp.com",
    databaseURL: "https://shop-f01e1.firebaseio.com",
    projectId: "shop-f01e1",
    storageBucket: "shop-f01e1.appspot.com",
    messagingSenderId: "657635240117",
    appId: "1:657635240117:web:3c0e0b2ddf6180c21776fc"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// sign in with google account
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// save authenticated user to our database
export const createUserProfileDocument = async (userAuth: any, additionalData: any = {}) => {
    // check if there is a user object
    if (!userAuth) return;

    // check if there is the user in our firestore

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    // return an object where we can check whether user exists in our db or not
    // we can apply CRUD only to documentReference (userRef.get/.set/.update/.delete), to doc, while snapShot only represents the data
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        // basically we need displayName, email, uid
        const {displayName, email} = userAuth;
        // we also need to know when we made the doc
        const createdAt = new Date();

        try {
            await userRef.set({displayName, email, createdAt, ...additionalData})
        } catch (error) {
            console.log(`creating user error: ${error.message}`);
        }
    }

    // we need to return userRef in case we have to do something else with it
    return userRef;
}



export default firebase;