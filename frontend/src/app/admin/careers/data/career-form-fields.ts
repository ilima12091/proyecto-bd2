export const careerFormFields = (row: any) => [
  { name: "name", label: "Nombre", type: "text", value: row.name },
  { name: "code", label: "Código", type: "text", value: row.code },
  { name: "area", label: "Área", type: "text", value: row.area },
];
