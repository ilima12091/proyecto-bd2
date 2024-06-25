"use client";

import React from "react";

import "./styles.css";
import { IconType } from "react-icons";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

type TableProps = {
  columns: {
    label: string;
    key: string;
  }[];
  actions: {
    label: string;
    Icon: IconType;
    onClick: (row: any) => void;
  }[];
  data: any[];
};

export default function Table({ columns, data, actions }: Readonly<TableProps>) {
  return (
    <table className="table">
      {columns && (
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key} className="table-header">
                {label}
              </th>
            ))}
            {actions?.length > 0 && <th className="table-header">Actions</th>}
          </tr>
        </thead>
      )}
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length + 1} className="table-no-data">
              <ErrorAlert errorText="No hay datos para mostrar" />
            </td>
          </tr>
        )}
        {data.map((row, i) => (
          <tr key={JSON.stringify(row)}>
            {columns.map(({ key }) => (
              <td key={key} className="table-data">
                {row[key]}
              </td>
            ))}
            <td className="table-actions">
              {actions?.map(({ label, onClick, Icon }) => (
                <button
                  key={label}
                  onClick={() => onClick(row)}
                  className="table-data table-action-button"
                >
                  {Icon ? <Icon size={18} /> : label}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
