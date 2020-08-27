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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;