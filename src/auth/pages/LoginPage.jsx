import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} sx={{ mt: 0.5 }}>
              <TextField
                type="email"
                label="Correo"
                placeholder="correo@correo.com"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mt: 0.5 }}>
              <TextField
                type="password"
                label="Contraseña"
                placeholder="********"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
