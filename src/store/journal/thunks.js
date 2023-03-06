import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNotes,
  isSavingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNotes,
} from "./";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(isSavingNewNote());

    // current state info
    // console.log(getState());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    // Conx with firebase
    // El uid del usuario va a ser el usuario autenticado (de esta manera ya tenemos la referencia de cada notas con un user distinto)
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    // Creamos la propieda 'id' para el newNote
    newNote.id = newDoc.id;
    // dispatch
    dispatch(addNewEmptyNotes(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid del usuario no existe!");
    // console.log({ uid });
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFisebase = { ...note };
    // La activeNote también cuenta con el id por lo que es conveniente eliminarlo para así guradr los datos actualizado en relación al usuario
    delete noteToFisebase.id;
    // console.log(noteToFisebase);

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    await setDoc(docRef, noteToFisebase, { merge: true });
    dispatch(updateNotes(note));
  };
};
