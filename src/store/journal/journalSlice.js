import { createSlice } from "@reduxjs/toolkit";
export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //   id: "abx123",
    //   title: "",
    //   body: "",
    //   date: 123454,
    //   imageUrls: [],
    // },
  },
  reducers: {
    isSavingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNotes: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNotes: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    deleteNotesById: (state, action) => {},
  },
});
export const {
  isSavingNewNote,
  addNewEmptyNotes,
  setActiveNote,
  setNotes,
  setSaving,
  updateNotes,
  deleteNotesById,
} = journalSlice.actions;
