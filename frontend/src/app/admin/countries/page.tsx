"use client";

import React from "react";
import { tableColumns } from "./data/table-columns";
import { countryFormFields } from "./data/country-form-fields";
import {
  createCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from "@/services/countriesService";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import useGetData from "@/hooks/useGetData";

export default function Countries() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getCountries()
  );

  return (
    <CommonAdminScreen
      title="Países"
      data={
        data ?? [
          {
            name: "Uruguay",
            confederation: "CONMEBOL",
          },
        ]
      }
      handleCreate={createCountry}
      handleUpdate={updateCountry}
      handleDelete={deleteCountry}
      formFields={countryFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading}
      error={error}
    />
  );
}
