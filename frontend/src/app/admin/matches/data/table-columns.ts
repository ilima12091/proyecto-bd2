import { TableColumn } from "@/types/TableColumn";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";

export const tableColumns = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
): TableColumn[] => [
  {
    label: "Local",
    key: "homeName",
  },
  {
    label: "Visitante",
    key: "awayName",
  },
  {
    label: "Fecha",
    key: "date",
  },
  {
    label: "Goles local",
    key: "homeGoals",
  },
  {
    label: "Goles visitante",
    key: "awayGoals",
  },
  {
    label: "Etapa",
    key: "stage",
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
