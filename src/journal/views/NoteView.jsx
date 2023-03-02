import { ImageGallery } from "../components";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

export const NoteView = () => {
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
          2 de Febrero, 2023
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
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
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          placeholder="¿Qué quieres contarnos?"
          fullWidth
          minRows={5}
        />
      </Grid>
      {/* Imag Gallery */}
      <ImageGallery />
    </Grid>
  );
};
