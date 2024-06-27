export const venueFormFields = (row: any, data: any) => {
  const parsedCountries = data?.countries?.map(({ name, id }) => ({
    label: name,
    value: id,
  })) ?? [
    {
      label: "Uruguay",
      value: 1,
    },
  ];

  return [
    { name: "city", label: "Ciudad", type: "text", value: row.city, required: true },
    { name: "state", label: "Estado", type: "text", value: row.state, required: true },
    {
      name: "country",
      label: "País",
      type: "select",
      required: true,
      value: row.countryId,
      items: parsedCountries,
    },
  ];
};
