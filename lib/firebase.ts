import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-QILf2Pug4vudRgLY5oAIpVIbE3x_mFU",
  authDomain: "next-js-assignment.firebaseapp.com",
  projectId: "next-js-assignment",
  storageBucket: "next-js-assignment.appspot.com",
  messagingSenderId: "951661589608",
  appId: "1:951661589608:web:29a2ced54304cdc32077dd",
  measurementId: "G-ZCXJE2Z5T7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
