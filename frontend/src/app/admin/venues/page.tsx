"use client";

import React from "react";
import { venueFormFields } from "./data/venue-form-fields";
import { tableColumns } from "./data/table-columns";
import { deleteVenue, getVenues, updateVenue } from "@/services/venuesService";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import useGetData from "@/hooks/useGetData";

export default function Venues() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getVenues()
  );

  return (
    <CommonAdminScreen
      title="Sedes"
      data={data ?? [{ city: "Montevideo", state: "Montevideo" }]}
      handleUpdate={updateVenue}
      handleDelete={deleteVenue}
      formFields={venueFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading}
      error={error}
    />
  );
}
