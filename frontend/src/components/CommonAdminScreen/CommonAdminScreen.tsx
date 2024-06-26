"use client";
import React from "react";
import { useModal } from "@/contexts/modalContext";
import toast from "react-hot-toast";
import FormGenerator from "../FormGenerator/FormGenerator";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Table from "../Table/Table";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Spinner from "../Spinner/Spinner";

import "./styles.css";

type CommonAdminScreenProps = {
  title: string;
  handleUpdate: (id: number, values: any) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  formFields: (row: any) => any;
  tableColumns: (onEdit: (row: any) => void, onDelete: (row: any) => void) => any;
  data: any[];
  refetchData: () => void;
  isLoading: boolean;
  error?: boolean;
};

export default function CommonAdminScreen({
  title,
  handleUpdate,
  handleDelete,
  formFields,
  tableColumns,
  data,
  refetchData,
  isLoading,
  error,
}: Readonly<CommonAdminScreenProps>) {
  // TODO: Eliminar cuando se conecte al backend correctamente
  error = false;
  const { openModal, closeModal } = useModal();

  const handleEdit = async (id: number, values: any) => {
    try {
      await handleUpdate(id, values);
      toast.success("Editado correctamente");
      refetchData();
    } catch (error) {
      toast.error("Error al editar");
    }
  };

  const onEdit = (row: any) => {
    openModal(
      <FormGenerator
        title="Editar"
        fields={formFields(row)}
        onSubmit={(data: any) => handleEdit(row.id, data)}
        onCancel={closeModal}
        disabled={isLoading}
      />
    );
  };

  const onDelete = async (row: any) => {
    try {
      await handleDelete(row.id);
      toast.success("Eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  return (
    <ProtectedRoute>
      <main className="admin-screen">
        <h1 className="admin-screen-title">{title}</h1>
        {isLoading && <Spinner />}
        {error && <ErrorAlert errorText="Error al cargar los datos" />}
        {!error && !isLoading && (
          <Table columns={tableColumns(onEdit, onDelete)} data={data} />
        )}
      </main>
    </ProtectedRoute>
  );
}
