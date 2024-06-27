export const registerFormFields = (teams: any[]) => {
  const parsedTeams = teams.map(({ name, id }) => ({ label: name, value: id }));
  return [
    {
      label: "Nombre",
      type: "text",
      name: "name",
      required: true,
    },
    {
      label: "Apellido",
      type: "text",
      name: "surname",
      required: true,
    },
    {
      label: "Correo electrónico",
      type: "text",
      name: "email",
      required: true,
    },
    {
      label: "Contraseña",
      type: "password",
      name: "password",
      required: true,
    },
    {
      label: "Confirmar contraseña",
      type: "password",
      name: "passwordConfirmation",
      required: true,
    },
    {
      label: "CI",
      type: "number",
      name: "identificationId",
      required: true,
    },
    {
      label: "Campeón",
      type: "select",
      name: "champion",
      required: true,
      items: parsedTeams,
    },
    {
      label: "Subcampeón",
      type: "select",
      name: "runnerUp",
      required: true,
      items: parsedTeams,
    },
  ];
};
