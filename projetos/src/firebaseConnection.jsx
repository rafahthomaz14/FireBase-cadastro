import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDYJ6wDiTJTQnN7uVJCJhW7fc2v4vye53g",
  authDomain: "projeto-rafa-7af5c.firebaseapp.com",
  projectId: "projeto-rafa-7af5c",
  storageBucket: "projeto-rafa-7af5c.firebasestorage.app",
  messagingSenderId: "67285228023",
  appId: "1:67285228023:web:ff945c7daebe21b4ab36f2",
  measurementId: "G-HGWP7GGWYY"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export {db}