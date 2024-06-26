import { TableColumn } from "@/types/TableColumn";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";

export const tableColumns = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
): TableColumn[] => [
  {
    label: "Cédula",
    key: "identificationId",
  },
  {
    label: "Nombre",
    key: "name",
  },
  {
    label: "Apellido",
    key: "surname",
  },
  {
    label: "Correo",
    key: "email",
  },
  {
    label: "Fecha de creación",
    key: "creationDate",
  },
  {
    label: "Acciones",
    key: "actions",
    actions: (row: any) => [
      {
        label: "Editar",
        Icon: FaPen,
        onClick: (row: any) => {
          console.log("Edit", row);
          onEdit?.(row);
        },
      },
      {
        label: "Eliminar",
        Icon: FaRegTrashCan,
        onClick: (row: any) => {
          console.log("Delete", row);
          onDelete?.(row);
        },
      },
    ],
  },
];
