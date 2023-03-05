import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { photoURL, uid } = result.user;
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
      errorMessage: "El usuario ya existe en Firebase",
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
