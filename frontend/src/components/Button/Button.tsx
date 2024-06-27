import React, { ButtonHTMLAttributes } from "react";

import "./styles.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export default function Button({
  label,
  className,
  variant = "primary",
  disabled = false,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button className={`${className} button button-${variant}`} {...props}>
      {label}
    </button>
  );
}
