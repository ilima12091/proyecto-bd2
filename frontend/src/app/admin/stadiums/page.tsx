"use client";

import React from "react";
import { stadiumFormFields } from "./data/stadium-form-fields";
import { tableColumns } from "./data/table-columns";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import {
  createStadium,
  deleteStadium,
  getStadiums,
  updateStadium,
} from "@/services/stadiumsService";
import useGetData from "@/hooks/useGetData";
import { getVenues } from "@/services/venuesService";

export default function Stadiums() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getStadiums()
  );

  const { data: venues, isLoading: isLoadingVenues } = useGetData(
    async () => await getVenues()
  );

  return (
    <CommonAdminScreen
      title="Estadios"
      data={data ?? [{ name: "Centenario", venueId: 1 }]}
      handleCreate={createStadium}
      handleUpdate={updateStadium}
      handleDelete={deleteStadium}
      formFields={stadiumFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading || isLoadingVenues}
      error={error}
      formFieldsProps={{ venues }}
    />
  );
}
