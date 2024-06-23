import React, { ButtonHTMLAttributes } from "react";

import "./styles.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
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
