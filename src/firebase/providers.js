import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    // mi config + el proveedor google
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    console.log(credentials);
  } catch (error) {
    console.log(error);
  }
};
