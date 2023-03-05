import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRegisteringUserWithEmailAndPassword } from "../../store/auth";
// Por si queremos datos por defecto para no estar escribiendo...
// const defaultFormData = {
//   displayName: "Chanchito Perez",
//   email: "chanchito@perez.com",
//   password: "chan123",
// };

const formValidator = {
  email: [(value) => value.includes("@"), "El correo no tiene @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña al menos tiene que tener 6 caracteres",
  ],
  displayName: [
    (value) => value.length >= 3,
    "El nombre es obligatorio y debe tener al menos 3 carcteres",
  ],
};

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
    onResetForm,
    formState,
    isValidForm,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(
    {
      displayName: "",
      email: "",
      password: "",
    },
    formValidator
  );

  // console.log(displayNameValid);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setformSubmited(true);

    if (!isValidForm) retrun;
    // alert(JSON.stringify(formState));
    // onResetForm();
    dispatch(startRegisteringUserWithEmailAndPassword(formState));
  };
  return (
    <>
      <AuthLayout title="Register">
        <h1>Formulario: {isValidForm ? "Válido" : "Inválido"}</h1>
        <form onSubmit={handleSubmit}>
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
