export const adminFormFields = (row: any) => [
  {
    name: "identificationId",
    label: "Cédula",
    type: "text",
    value: row.identificationId,
  },
  { name: "name", label: "Nombre", type: "text", value: row.name },
  { name: "surname", label: "Apellido", type: "text", value: row.surname },
  { name: "email", label: "Correo", type: "email", value: row.email },
  { name: "password", label: "Contraseña", type: "password", value: "" },
];
