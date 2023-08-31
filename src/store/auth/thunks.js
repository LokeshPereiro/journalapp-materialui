import {
  singInWithGoogle,
  registerUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  logoutFirebase,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
// Reducers del Redux
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
  //Not-Authenticated to Checking..
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
export const checkingGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    //Si todo salió bien, deberíamos de obtener la info aquí
    // console.log(result);

    //Si algo falla, entoces, el estado vuelve a ser not-authenticated
    if (!result.ok) return dispatch(logout(result.errorMessage));

    //Guardamos la info del user como Authenticated
    dispatch(login(result));
  };
};

export const startRegisteringUserWithEmailAndPassword = ({
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage, displayName } =
      await registerUserWithEmailAndPassword({
        email,
        password,
      });
    // el errorMsg sría si el user ya existe, las credenciales no coinciden, etc
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailAndPassword({ email, password });
    // console.log(result);
    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
