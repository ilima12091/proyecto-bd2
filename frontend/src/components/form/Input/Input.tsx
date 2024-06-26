import React from "react";

import "./styles.css";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  variant?: "primary" | "outlined";
};

export default function Input(props: Readonly<InputProps>) {
  const { variant = "primary", className } = props;

  return (
    <input className={`form-input form-input-${variant} ${className ?? ""}`} {...props} />
  );
}
