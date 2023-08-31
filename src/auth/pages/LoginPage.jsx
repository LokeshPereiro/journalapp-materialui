// Tanto los hooks de react, como el react-redux y el react-router dom tienen más importancia que los demás, por lo que, es recomendale situarlos como primeros
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkingAuthentication,
  checkingGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";
import { Link as RouterLink } from "react-router-dom";

// Luego van las importaciones de terceros y mis componentes/hooks
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const formData = {
  email: "",
  password: "",
};
export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  //Deshabilitar los botones para cuando estemos en checking
  const isAuthenticating = useMemo(() => status === "Checking", [status]);

  const dispatch = useDispatch();
  const { email, password, onInputChange, formState } = useForm(formData);

  // Autenticación con el Submit Normal
  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
    // console.log(formState);
  };

  // Autenticación con el Google
  const onGoogleSignIn = () => {
    // console.log("Google sing in..");
    dispatch(checkingGoogleSignIn());
  };
  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate_fadeIn animate_faster"
      >
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
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ mt: 1 }}
              display={!!errorMessage ? "" : "none"}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
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
