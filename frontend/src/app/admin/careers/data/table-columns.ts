import { TableColumn } from "@/types/TableColumn";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";

export const tableColumns = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
): TableColumn[] => [
  {
    label: "Nombre",
    key: "name",
  },
  {
    label: "Código",
    key: "code",
  },
  {
    label: "Área",
    key: "area",
  },
  {
    label: "Acciones",
    key: "actions",
    actions: (row: any) => [
      {
        label: "Editar",
        Icon: FaPen,
        onClick: (row: any) => {
          onEdit?.(row);
        },
      },
      {
        label: "Eliminar",
        Icon: FaRegTrashCan,
        onClick: (row: any) => {
          onDelete?.(row);
        },
      },
    ],
  },
];
