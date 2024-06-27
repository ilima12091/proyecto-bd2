"use client";

import React from "react";
import { venueFormFields } from "./data/venue-form-fields";
import { tableColumns } from "./data/table-columns";
import {
  createVenue,
  deleteVenue,
  getVenues,
  updateVenue,
} from "@/services/venuesService";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import useGetData from "@/hooks/useGetData";
import { getCountries } from "@/services/countriesService";

export default function Venues() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getVenues()
  );

  const { data: countries, isLoading: isLoadingCountries } = useGetData(
    async () => await getCountries()
  );

  return (
    <CommonAdminScreen
      title="Sedes"
      data={data ?? [{ city: "Montevideo", state: "Montevideo", countryId: 1 }]}
      handleCreate={createVenue}
      handleUpdate={updateVenue}
      handleDelete={deleteVenue}
      formFields={venueFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading || isLoadingCountries}
      error={error}
      formFieldsProps={{ countries }}
    />
  );
}
