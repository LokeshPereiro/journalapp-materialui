import { singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
export const checkingGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = singInWithGoogle();
  };
};
