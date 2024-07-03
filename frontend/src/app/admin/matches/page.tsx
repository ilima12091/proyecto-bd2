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
import { getTeams } from "@/services/teamsService";
import { getStadiums } from "@/services/stadiumsService";

export default function Matches() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getMatches()
  );
  const { data: teams } = useGetData(async () => await getTeams());
  const { data: stadiums } = useGetData(async () => await getStadiums());

  return (
    <CommonAdminScreen
      title="Partidos"
      data={data}
      handleCreate={createMatch}
      handleUpdate={updateMatch}
      handleDelete={deleteMatch}
      formFields={matchFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading}
      error={error}
      formFieldsProps={{
        teams,
        stadiums,
      }}
    />
  );
}
