import { FaRegTrashCan, FaPen } from "react-icons/fa6";

export const tableActions = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
) => [
  {
    label: "Edit",
    Icon: FaPen,
    onClick: (row: any) => {
      console.log("Edit", row);
      onEdit?.(row);
    },
  },
  {
    label: "Delete",
    Icon: FaRegTrashCan,
    onClick: (row: any) => {
      console.log("Delete", row);
      onDelete?.(row);
    },
  },
];
