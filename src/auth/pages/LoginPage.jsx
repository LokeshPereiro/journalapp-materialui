// Tanto el react-redux y eñ react-rputer dom tienen más importancia que los demás, por lo que, es recomendale situarlos como primeros
import { useDispatch } from "react-redux";
import { checkingAuthentication, checkingGoogleSignIn } from "../../store/auth";
import { Link as RouterLink } from "react-router-dom";

// Luego van las importaciones de terceros y mis componentes/hooks
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } = useForm({
    email: "",
    password: "",
  });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(checkingAuthentication());
    // console.log(formState);
  };

  const onGoogleSignIn = () => {
    // console.log("Google sing in..");
    dispatch(checkingGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} sx={{ mt: 0.5 }}>
              <TextField
                type="email"
                label="Correo"
                placeholder="correo@correo.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mt: 0.5 }}>
              <TextField
                type="password"
                label="Contraseña"
                placeholder="********"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSignIn} variant="contained" fullWidth>
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
