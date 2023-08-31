import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { startRegisteringUserWithEmailAndPassword } from "../../store/auth";
import { formValidator } from "../../helpers";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmited, setformSubmited] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuth = useMemo(() => {
    status === "Checking";
  }, [status]);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isValidForm,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(
    {
      email: "",
      password: "",
      displayName: "",
    },
    formValidator
  );

  // console.log(displayNameValid);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setformSubmited(true);

    if (!isValidForm) return;
    // alert(JSON.stringify(formState));
    // onResetForm();
    dispatch(startRegisteringUserWithEmailAndPassword(formState));
  };
  return (
    <>
      <AuthLayout title="Register">
        <h1>Formulario: {isValidForm ? "Válido" : "Inválido"}</h1>
        <form
          onSubmit={handleSubmit}
          className="animate__animated animate_fadeIn animate_faster"
        >
          <Grid container>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <TextField
                  type="text"
                  label="Nombre Completo"
                  placeholder="Chancito Perez"
                  fullWidth
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                  error={!!displayNameValid && formSubmited}
                  helperText={displayNameValid}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <TextField
                  type="email"
                  label="Correo"
                  placeholder="chancito@perez.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmited}
                  helperText={emailValid}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <TextField
                  type="password"
                  label="Contraseña"
                  placeholder="******"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  error={!!passwordValid && formSubmited}
                  helperText={passwordValid}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 0.5 }}>
              <Grid
                item
                xs={12}
                sx={{ mb: 0.5 }}
                display={!!errorMessage ? "" : "none"}
              >
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} sx={{ mb: 0.5 }}>
                <Button
                  disabled={isCheckingAuth}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
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
