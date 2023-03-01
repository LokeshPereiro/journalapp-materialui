import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <>
      <AuthLayout title="Register">
        <form>
          <Grid container>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <TextField
                  type="text"
                  label="Nombre Completo"
                  placeholder="Chancito Perez"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <TextField
                  type="email"
                  label="Correo"
                  placeholder="correo@correo.com"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <TextField
                  type="password"
                  label="Contraseña"
                  placeholder="********"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sx={{ mb: 0.5 }}>
                <Button variant="contained" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1 }}>¿Tienes cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Entrar
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
