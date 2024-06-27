export const stadiumFormFields = (row: any, data: any) => {
  const parsedVenues = data?.venues?.map(({ name, id }) => ({
    label: name,
    value: id,
  })) ?? [
    {
      label: "Montevideo",
      value: 1,
    },
  ];

  return [
    { name: "name", label: "Nombre", type: "text", value: row.name },
    {
      name: "venue",
      label: "Sede",
      type: "select",
      required: true,
      value: row.venueId,
      items: parsedVenues,
    },
  ];
};
