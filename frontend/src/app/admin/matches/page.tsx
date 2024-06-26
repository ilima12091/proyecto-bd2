"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import useGetMatches from "@/hooks/useGetMatches";
import { tableColumns } from "./data/table-columns";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { matchFormFields } from "./data/match-form-fields";
import { deleteMatch, updateMatch } from "@/services/matchesService";
import toast from "react-hot-toast";

import "./styles.css";

export default function Matches() {
  const { openModal, closeModal } = useModal();
  const { data, getMatchesData } = useGetMatches();

  const onSubmit = async (matchId: number, values: any) => {
    try {
      await updateMatch(matchId, values);
      toast.success("Partido editado correctamente");
      await getMatchesData();
    } catch (error) {
      toast.error("Error al editar el partido");
    }
  };

  const handleEdit = (row: any) => {
    openModal(
      <FormGenerator
        title="Editar partido"
        fields={matchFormFields(row)}
        onSubmit={(data: any) => onSubmit(row.id, data)}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteMatch(row?.id);
      toast.success("Partido eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el partido");
    }
  };

  return (
    <ProtectedRoute>
      <main className="matches">
        <h1 className="matches-title">Partidos</h1>
        <Table
          columns={tableColumns(handleEdit, handleDelete)}
          data={
            data ?? [
              {
                id: 1,
                home: "Uruguay",
                away: "Argentina",
                date: "2021-10-10",
                homeGoals: 2,
                awayGoals: 1,
                stage: "Group",
              },
            ]
          }
        />
      </main>
    </ProtectedRoute>
  );
}
