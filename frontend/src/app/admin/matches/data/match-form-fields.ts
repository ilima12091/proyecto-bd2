export const matchFormFields = (row: any) => [
  { name: "home", label: "Home", type: "text", value: row.home },
  { name: "away", label: "Away", type: "text", value: row.away },
  { name: "date", label: "Date", type: "date", value: row.date },
  {
    name: "homeGoals",
    label: "Home goals",
    type: "number",
    value: row.homeGoals,
  },
  {
    name: "awayGoals",
    label: "Away goals",
    type: "number",
    value: row.awayGoals,
  },
  { name: "stage", label: "Stage", type: "text", value: row.stage },
];
