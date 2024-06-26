"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import toast from "react-hot-toast";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { stadiumFormFields } from "./data/stadium-form-fields";
import useGetStadiums from "@/hooks/useGetStadiums";
import { tableColumns } from "./data/table-columns";

import "./styles.css";
import { deleteStadium, updateStadium } from "@/services/stadiumsService";

export default function Stadiums() {
  const { openModal, closeModal } = useModal();
  const { data, getStadiumsData } = useGetStadiums();

  const onSubmit = async (stadiumId: number, values: any) => {
    try {
      await updateStadium(stadiumId, values);
      toast.success("Estadio editado correctamente");
      await getStadiumsData();
    } catch (error) {
      toast.error("Error al editar el estadio");
    }
  };

  const handleEdit = async (row: any) => {
    openModal(
      <FormGenerator
        title="Editar estadio"
        fields={stadiumFormFields(row)}
        onSubmit={(data: any) => onSubmit(row.id, data)}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteStadium(row?.id);
      toast.success("Estadio eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el estadio");
    }
  };

  return (
    <ProtectedRoute>
      <main className="stadiums">
        <h1 className="stadiums-title">Estadios</h1>
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
