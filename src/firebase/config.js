import { initializeApp } from "firebase/app";
// User auth
import { getAuth } from "firebase/auth";
// Cloud DB
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_APIKEY,
  authDomain: import.meta.env.VITE_FIRE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIRE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIRE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_MSGSENDERID,
  appId: import.meta.env.VITE_FIRE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
