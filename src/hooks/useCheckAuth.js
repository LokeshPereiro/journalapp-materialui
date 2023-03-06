import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingNotes } from "../store/journal";
import { login, logout } from "../store/auth";

import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      // console.log(user);
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      // Estado en authenticated para proteger las rutas
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);
  return {
    status,
  };
};
