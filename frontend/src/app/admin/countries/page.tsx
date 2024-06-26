"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import toast from "react-hot-toast";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { tableColumns } from "./data/table-columns";
import useGetCountries from "@/hooks/useGetCountries";
import { countryFormFields } from "./data/country-form-fields";
import { deleteCountry, updateCountry } from "@/services/countriesService";

import "./styles.css";

export default function Countries() {
  const { openModal, closeModal } = useModal();
  const { data, getCountriesData } = useGetCountries();

  const onSubmit = async (countryId: number, values: any) => {
    try {
      await updateCountry(countryId, values);
      toast.success("País editado correctamente");
      await getCountriesData();
    } catch (error) {
      toast.error("Error al editar el país");
    }
  };

  const handleEdit = async (row: any) => {
    openModal(
      <FormGenerator
        title="Editar país"
        fields={countryFormFields(row)}
        onSubmit={(data: any) => onSubmit(row.id, data)}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteCountry(row?.id);
      toast.success("País eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el país");
    }
  };

  return (
    <ProtectedRoute>
      <main className="countries">
        <h1 className="countries-title">Países</h1>
        <Table
          columns={tableColumns(handleEdit, handleDelete)}
          data={
            data ?? [
              {
                name: "Uruguay",
                confederation: "CONMEBOL",
              },
            ]
          }
        />
      </main>
    </ProtectedRoute>
  );
}
