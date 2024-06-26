"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import { tableColumns } from "./data/table-columns";
import useGetTeams from "@/hooks/useGetTeams";
import { deleteTeam, updateTeam } from "@/services/teamsService";
import toast from "react-hot-toast";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { teamFormFields } from "./data/team-form-fields";

import "./styles.css";

export default function Teams() {
  const { openModal, closeModal } = useModal();
  const { data, getTeamsData } = useGetTeams();

  const onSubmit = async (teamId: number, values: any) => {
    try {
      await updateTeam(teamId, values);
      toast.success("Equipo editado correctamente");
      await getTeamsData();
    } catch (error) {
      toast.error("Error al editar el equipo");
    }
  };

  const handleEdit = async (row: any) => {
    openModal(
      <FormGenerator
        title="Editar equipo"
        fields={teamFormFields(row)}
        onSubmit={(data: any) => onSubmit(row.teamId, data)}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteTeam(row?.id);
      toast.success("Equipo eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el equipo");
    }
  };

  return (
    <ProtectedRoute>
      <main className="teams">
        <h1 className="teams-title">Equipos</h1>
        <Table
          columns={tableColumns(handleEdit, handleDelete)}
          data={
            data ?? [
              {
                name: "Uruguay",
              },
            ]
          }
        />
      </main>
    </ProtectedRoute>
  );
}
