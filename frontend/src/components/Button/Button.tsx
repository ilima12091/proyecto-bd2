import React from "react";

import "./styles.css";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
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
