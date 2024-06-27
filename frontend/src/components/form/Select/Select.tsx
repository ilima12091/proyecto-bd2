import React from "react";

type SelectProps = React.HTMLProps<HTMLSelectElement> & {
  items: {
    value: string;
    label: string;
  }[];
  variant?: "primary" | "outlined";
};

export default function Select(props: Readonly<SelectProps>) {
  const { items, variant, className } = props;

  return (
    <select {...props} className={`form-input form-input-${variant} ${className ?? ""}`}>
      <option value="">Seleccione un elemento</option>
      {items.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
