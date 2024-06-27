import { FaPen, FaRegTrashCan } from "react-icons/fa6";

export const tableColumns = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
) => [
  {
    label: "Ciudad",
    key: "city",
  },
  {
    label: "Estado",
    key: "state",
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
