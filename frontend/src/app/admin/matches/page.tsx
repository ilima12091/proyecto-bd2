"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import useGetMatches from "@/hooks/useGetMatches";
import { tableColumns } from "./data/table-columns";
import { tableActions } from "./data/table-actions";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { matchFormFields } from "./data/match-form-fields";

import "./styles.css";

export default function Matches() {
  const { openModal, closeModal } = useModal();
  const { data } = useGetMatches();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const handleEdit = (row: any) => {
    openModal(
      <FormGenerator
        title="Editar partido"
        fields={matchFormFields(row)}
        onSubmit={onSubmit}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = (row: any) => {};

  const tableRowActions = tableActions(handleEdit, handleDelete);

  return (
    <ProtectedRoute>
      <main className="matches">
        <h1 className="matches-title">Matches</h1>
        <Table
          columns={tableColumns}
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
          actions={tableRowActions}
        />
      </main>
    </ProtectedRoute>
  );
}
