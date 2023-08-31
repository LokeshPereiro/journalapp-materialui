import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";

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

  const fileInputRef = useRef();

  const onFileInputChange = ({ target }) => {
    // console.log(target.files);
    if (target.files === 0) return;
    // console.log("Subiendo archivos...");

    dispatch(startUploadingFiles(target.files));
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
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
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

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
      <Grid container justifyContent="end">
        <Button onClick={onDeleteNote} sx={{ mt: 2 }} color="error">
          <DeleteOutline /> Borrar
        </Button>
      </Grid>
      {/* Imag Gallery */}
      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
