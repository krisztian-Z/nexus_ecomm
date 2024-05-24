import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";



// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBKouTt6uKmcjLo7KRD34HSXlU5BtU--74",
  authDomain: "nexusecomm-acc0f.firebaseapp.com",
  projectId: "nexusecomm-acc0f",
  storageBucket: "nexusecomm-acc0f.appspot.com",
  messagingSenderId: "99298315510",
  appId: "1:99298315510:web:ac9eff17598fddba4d30d7",
  measurementId: "G-Y09CD9R6FX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};