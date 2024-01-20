import firebase from "firebase/compat/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_apiKey}`,
    authDomain: `${process.env.REACT_APP_authDomain}`,
    projectId: "bankomat-af036",
    storageBucket: "bankomat-af036.appspot.com",
    messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
    appId: `${process.env.REACT_APP_appId}`,
    measurementId: `${process.env.measurementId}`
};

const app = firebase.initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = firebase.auth()
const firestore = firebase.firestore

export { db, storage, auth, firestore }