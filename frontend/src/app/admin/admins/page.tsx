"use client";

import React from "react";
import { adminFormFields } from "./data/admin-form-fields";
import { tableColumns } from "./data/table-columns";
import { deleteAdmin, getAdmins, updateAdmin } from "@/services/adminsService";
import CommonAdminScreen from "@/components/CommonAdminScreen/CommonAdminScreen";
import useGetData from "@/hooks/useGetData";

export default function Venues() {
  const { data, refetchData, isLoading, error } = useGetData(
    async () => await getAdmins()
  );

  return (
    <CommonAdminScreen
      title="Admins"
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
      handleUpdate={updateAdmin}
      handleDelete={deleteAdmin}
      formFields={adminFormFields}
      tableColumns={tableColumns}
      refetchData={refetchData}
      isLoading={isLoading}
      error={error}
    />
  );
}
