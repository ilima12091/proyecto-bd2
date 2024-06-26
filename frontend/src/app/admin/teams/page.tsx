"use client";

import React from "react";
import { tableColumns } from "./data/table-columns";
import { deleteTeam, getTeams, updateTeam } from "@/services/teamsService";
import { teamFormFields } from "./data/team-form-fields";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import useGetData from "@/hooks/useGetData";

export default function Teams() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getTeams()
  );

  return (
    <CommonAdminScreen
      title="Equipos"
      data={
        data ?? [
          {
            name: "Uruguay",
            urlLogo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Uruguay_football_association_logo.svg/1200px-Uruguay_football_association_logo.svg.png",
          },
        ]
      }
      handleUpdate={updateTeam}
      handleDelete={deleteTeam}
      formFields={teamFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading}
      error={error}
    />
  );
}
