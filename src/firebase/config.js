import { initializeApp } from "firebase/app";
// User auth
import { getAuth } from "firebase/auth";
// Clod DB
import { getFirestore } from "firebase/firestore/lite";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMaCSH8IRHuYdK8rUFyP55asqUrfM7RiI",
  authDomain: "journalapp-auth-67fc9.firebaseapp.com",
  projectId: "journalapp-auth-67fc9",
  storageBucket: "journalapp-auth-67fc9.appspot.com",
  messagingSenderId: "833419300738",
  appId: "1:833419300738:web:1e52901cfc051ad894899b",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
