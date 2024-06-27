"use client";

import React from "react";
import { tableColumns } from "./data/table-columns";
import { matchFormFields } from "./data/match-form-fields";
import {
  createMatch,
  deleteMatch,
  getMatches,
  updateMatch,
} from "@/services/matchesService";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import useGetData from "@/hooks/useGetData";

export default function Matches() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getMatches()
  );

  return (
    <CommonAdminScreen
      title="Partidos"
      data={
        data ?? [
          {
            id: 1,
            home: "Uruguay",
            away: "Argentina",
            date: "2021-10-10",
            homeGoals: 2,
            awayGoals: 1,
            stage: "Grupo A",
          },
        ]
      }
      handleCreate={createMatch}
      handleUpdate={updateMatch}
      handleDelete={deleteMatch}
      formFields={matchFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading}
      error={error}
    />
  );
}
