"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import toast from "react-hot-toast";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { venueFormFields } from "./data/venue-form-fields";
import { tableColumns } from "./data/table-columns";
import useGetVenues from "@/hooks/useGetVenues";
import { deleteVenue, updateVenue } from "@/services/venuesService";

import "./styles.css";

export default function Venues() {
  const { openModal, closeModal } = useModal();
  const { data, getVenuesData } = useGetVenues();

  const onSubmit = async (venueId: number, values: any) => {
    try {
      await updateVenue(venueId, values);
      toast.success("Sede editada correctamente");
      await getVenuesData();
    } catch (error) {
      toast.error("Error al editar la sede");
    }
  };

  const handleEdit = async (row: any) => {
    openModal(
      <FormGenerator
        title="Editar sede"
        fields={venueFormFields(row)}
        onSubmit={(data: any) => onSubmit(row.id, data)}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteVenue(row?.id);
      toast.success("Sede eliminada correctamente");
    } catch (error) {
      toast.error("Error al eliminar la sede");
    }
  };

  return (
    <ProtectedRoute>
      <main className="venues">
        <h1 className="venues-title">Sedes</h1>
        <Table
          columns={tableColumns(handleEdit, handleDelete)}
          data={
            data ?? [
              {
                city: "Montevideo",
                state: "Montevideo",
              },
            ]
          }
        />
      </main>
    </ProtectedRoute>
  );
}
