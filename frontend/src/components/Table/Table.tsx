"use client";

import React from "react";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { TableColumn } from "@/types/TableColumn";

import "./styles.css";

type TableProps = {
  columns: TableColumn[];
  data: any[];
};

export default function Table({ columns, data }: Readonly<TableProps>) {
  const { actions } = columns.find(({ key }) => key === "actions") || {};

  const filteredColumns = columns.filter(({ key }) => key !== "actions");

  return (
    <table className="table">
      {filteredColumns && (
        <thead>
          <tr>
            {filteredColumns.map(({ label, key }) => (
              <th key={key} className="table-header">
                {label}
              </th>
            ))}
            {actions && <th className="table-header">Acciones</th>}
          </tr>
        </thead>
      )}
      <tbody>
        {data?.length === 0 && (
          <tr>
            <td colSpan={columns.length + 1} className="table-no-data">
              <ErrorAlert errorText="No hay datos para mostrar" />
            </td>
          </tr>
        )}
        {data?.map((row) => (
          <tr key={JSON.stringify(row)}>
            {filteredColumns.map(({ key }) => (
              <td key={key} className="table-data">
                {row[key] ?? "-"}
              </td>
            ))}
            {actions && (
              <td className="table-actions">
                {actions?.(row)?.map(({ label, onClick, Icon }) => (
                  <button
                    key={label}
                    onClick={() => onClick(row)}
                    className="table-data table-action-button"
                  >
                    {Icon ? <Icon size={18} /> : label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
