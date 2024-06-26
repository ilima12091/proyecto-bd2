"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Table from "@/components/Table/Table";
import toast from "react-hot-toast";
import { useModal } from "@/contexts/modalContext";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { adminFormFields } from "./data/admin-form-fields";
import { tableColumns } from "./data/table-columns";
import useGetAdmins from "@/hooks/useGetAdmins";
import { deleteAdmin, updateAdmin } from "@/services/adminsService";

import "./styles.css";

export default function Venues() {
  const { openModal, closeModal } = useModal();
  const { data, getAdminsData } = useGetAdmins();

  const onSubmit = async (adminId: number, values: any) => {
    try {
      await updateAdmin(adminId, values);
      toast.success("Admin editado correctamente");
      await getAdminsData();
    } catch (error) {
      toast.error("Error al editar el admin");
    }
  };

  const handleEdit = async (row: any) => {
    openModal(
      <FormGenerator
        title="Editar admin"
        fields={adminFormFields(row)}
        onSubmit={(data: any) => onSubmit(row.id, data)}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = async (row: any) => {
    try {
      await deleteAdmin(row?.id);
      toast.success("Admin eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el admin");
    }
  };

  return (
    <ProtectedRoute>
      <main className="admins">
        <h1 className="admins-title">Admins</h1>
        <Table
          columns={tableColumns(handleEdit, handleDelete)}
          data={
            data ?? [
              {
                identificationId: "12345678",
                name: "Admin",
                surname: "Admin",
                email: "admin@admin.com",
                creationDate: "2021-10-10",
              },
            ]
          }
        />
      </main>
    </ProtectedRoute>
  );
}
