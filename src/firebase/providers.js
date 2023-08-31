import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

//Se va a llamar en los thunks
export const singInWithGoogle = async () => {
  try {
    // Aquí nos info completo acerca de como se obtuvo las credenciales
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log({ credentials });

    // mi config + el proveedor google
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // console.log(result.user);
    const { displayName, uid, photoURL, email } = result.user;
    // console.log(user);

    return {
      ok: true,
      // UserInfo
      uid,
      displayName,
      photoURL,
      email,
    };
  } catch (error) {
    // console.log(error);
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailAndPassword = async ({ email, password }) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = result.user;
    // console.log(result);
    // Actualizar el displayName en firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName });
    return {
      ok: true,
      uid,
      email,
      photoURL,
      displayName,
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage: errorMessage,
    };
  }
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { photoURL, uid, displayName } = result.user;
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    // const errorMessage = error.message;
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
