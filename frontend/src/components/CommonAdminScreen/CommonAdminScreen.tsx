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
import Button from "../Button/Button";

type CommonAdminScreenProps = {
  title: string;
  handleUpdate: (id: number, values: any) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleCreate: (values: any) => Promise<void>;
  formFields: (row: any, formFieldsProps: any) => any;
  tableColumns: (onEdit: (row: any) => void, onDelete: (row: any) => void) => any;
  data: any[];
  refetchData: () => void;
  isLoading: boolean;
  error?: boolean;
  formFieldsProps?: any;
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
  handleCreate,
  formFieldsProps,
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

  const create = async (values: any) => {
    try {
      await handleCreate(values);
      toast.success("Creado correctamente");
      refetchData();
    } catch (error) {
      toast.error("Error al crear");
    }
  };

  const onCreate = () => {
    openModal(
      <FormGenerator
        title="Crear"
        fields={formFields({}, formFieldsProps)}
        onSubmit={(data: any) => create(data)}
        onCancel={closeModal}
        disabled={isLoading}
      />
    );
  };

  const onEdit = (row: any) => {
    openModal(
      <FormGenerator
        title="Editar"
        fields={formFields(row, formFieldsProps)}
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
        <Button className="admin-screen-create-button" label="Crear" onClick={onCreate} />
        {isLoading && <Spinner />}
        {error && (
          <ErrorAlert errorText="Error al cargar los datos" retry={refetchData} />
        )}
        {!error && !isLoading && (
          <Table columns={tableColumns(onEdit, onDelete)} data={data} />
        )}
      </main>
    </ProtectedRoute>
  );
}
