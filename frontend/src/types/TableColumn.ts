import { IconType } from "react-icons";

export type TableColumn = {
  label: string;
  key: string;
  actions?: (row: any) => {
    label: string;
    Icon: IconType;
    onClick: (row: any) => void;
  }[];
};
