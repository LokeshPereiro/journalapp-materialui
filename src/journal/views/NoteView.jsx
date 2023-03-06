import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImageGallery } from "../components";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { setActiveNote, startSaveNote } from "../../store/journal";
import { useForm } from "../../hooks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: activeNote,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  const dateInString = useMemo(() => {
    const currDate = new Date(date);
    return currDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota acutalizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignContent="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateInString}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }}>Save</SaveOutlined>
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          label="Título"
          placeholder="Escribe un título"
          sx={{ mb: 1 }}
          fullWidth
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          placeholder="¿Qué quieres contarnos?"
          fullWidth
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      {/* Imag Gallery */}
      <ImageGallery />
    </Grid>
  );
};
