"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import toast from "react-hot-toast";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { tableColumns } from "./data/table-columns";
import { careerFormFields } from "./data/career-form-fields";
import useGetCareers from "@/hooks/useGetCareers";
import { deleteCareer, updateCareer } from "@/services/careersService";

import "./styles.css";

export default function Carreers() {
  const { openModal, closeModal } = useModal();
  const { data, getCareersData } = useGetCareers();

  const onSubmit = async (careerId: number, values: any) => {
    try {
      await updateCareer(careerId, values);
      toast.success("Carrera editada correctamente");
      await getCareersData();
    } catch (error) {
      toast.error("Error al editar la carrera");
    }
  };

  const handleEdit = async (row: any) => {
    openModal(
      <FormGenerator
        title="Editar carrera"
        fields={careerFormFields(row)}
        onSubmit={(data: any) => onSubmit(row.id, data)}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteCareer(row?.id);
      toast.success("Carrera eliminada correctamente");
    } catch (error) {
      toast.error("Error al eliminar la carrera");
    }
  };

  return (
    <ProtectedRoute>
      <main className="careers">
        <h1 className="careers-title">Carreras</h1>
        <Table
          columns={tableColumns(handleEdit, handleDelete)}
          data={
            data ?? [
              {
                name: "Ingeniería en Sistemas",
                code: "IS",
                area: "Tecnología",
              },
            ]
          }
        />
      </main>
    </ProtectedRoute>
  );
}
