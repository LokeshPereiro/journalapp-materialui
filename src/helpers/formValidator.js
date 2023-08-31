export const formValidator = {
  email: [(value) => value.includes("@"), "El correo no tiene @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña al menos tiene que tener 6 caracteres",
  ],
  displayName: [
    (value) => value.length >= 3,
    "El nombre es obligatorio y debe tener al menos 3 caracteres",
  ],
};
