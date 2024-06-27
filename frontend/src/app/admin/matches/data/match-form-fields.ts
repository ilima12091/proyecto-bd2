export const matchFormFields = (row: any, data: any) => {
  const parsedTeams = data?.teams?.map(({ name, id }) => ({
    label: name,
    value: id,
  })) ?? [
    {
      label: "Uruguay",
      value: 1,
    },
    {
      label: "Argentina",
      value: 2,
    },
  ];

  return [
    {
      name: "home",
      label: "Local",
      type: "select",
      value: row.homeId,
      items: parsedTeams,
    },
    {
      name: "away",
      label: "Visitante",
      type: "select",
      value: row.awayId,
      items: parsedTeams,
    },
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
};
