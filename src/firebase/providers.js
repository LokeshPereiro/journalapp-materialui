import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    // mi config + el proveedor google
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, photoURL, email, uid } = result.user;
    // console.log(user);

    return {
      ok: true,
      //  UserInfo
      displayName,
      photoURL,
      email,
      uid,
    };

    // Aquí nos info completo acerca de como se obtuvo las credenciales
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log({ credentials });
  } catch (error) {
    // console.log(error);
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};
