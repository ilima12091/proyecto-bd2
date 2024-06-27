export const countryFormFields = (row: any) => [
  { name: "name", label: "Nombre", type: "text", value: row.name },
  {
    name: "confederation",
    label: "Confederación",
    type: "text",
    value: row.confederation,
  },
];
