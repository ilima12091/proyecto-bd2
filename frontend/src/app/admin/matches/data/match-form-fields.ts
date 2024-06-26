export const matchFormFields = (row: any) => [
  { name: "home", label: "Local", type: "text", value: row.home },
  { name: "away", label: "Visitante", type: "text", value: row.away },
  { name: "date", label: "Fecha", type: "date", value: row.date },
  {
    name: "homeGoals",
    label: "Goles local",
    type: "number",
    value: row.homeGoals,
  },
  {
    name: "awayGoals",
    label: "Goles visitante",
    type: "number",
    value: row.awayGoals,
  },
  { name: "stage", label: "Etapa", type: "text", value: row.stage },
];
