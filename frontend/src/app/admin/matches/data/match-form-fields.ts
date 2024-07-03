export const matchFormFields = (row: any, data: any) => {
  const parsedTeams = data?.teams?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const parsedStadiums = data?.stadiums?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  return [
    {
      name: "home",
      label: "Local",
      type: "select",
      value: row.home,
      items: parsedTeams,
    },
    {
      name: "away",
      label: "Visitante",
      type: "select",
      value: row.away,
      items: parsedTeams,
    },
    {
      name: "stadiumId",
      label: "Estadio",
      type: "select",
      value: row.stadiumId,
      items: parsedStadiums,
    },
    {
      name: "date",
      label: "Fecha",
      type: "date",
      value: row.date ? row?.date?.split("T")?.[0] : "",
    },
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
