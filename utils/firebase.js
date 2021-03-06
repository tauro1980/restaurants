import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBFq9ZLejDFTop_rUzcKyZo9sFHTI1rmfw",
    authDomain: "restaurants-76e1c.firebaseapp.com",
    projectId: "restaurants-76e1c",
    storageBucket: "restaurants-76e1c.appspot.com",
    messagingSenderId: "1049525632179",
    appId: "1:1049525632179:web:30af5efccc31c89b5484c6"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
