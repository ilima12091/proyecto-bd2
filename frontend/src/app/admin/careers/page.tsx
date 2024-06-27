"use client";

import React from "react";
import { tableColumns } from "./data/table-columns";
import { careerFormFields } from "./data/career-form-fields";
import {
  createCareer,
  deleteCareer,
  getCareers,
  updateCareer,
} from "@/services/careersService";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import useGetData from "@/hooks/useGetData";

export default function Carreers() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getCareers()
  );

  return (
    <CommonAdminScreen
      title="Carreras"
      data={data ?? [{ name: "Ingeniería en Sistemas", code: "IS", area: "Tecnología" }]}
      handleCreate={createCareer}
      handleUpdate={updateCareer}
      handleDelete={deleteCareer}
      formFields={careerFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading}
      error={error}
    />
  );
}
