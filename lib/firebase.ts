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
  measurementId: "G-ZCXJE2Z5T7"
}

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
