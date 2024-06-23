import React from "react";

import "./styles.css";

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export default function Button({
  label,
  variant = "primary",
  disabled = false,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {label}
    </button>
  );
}
