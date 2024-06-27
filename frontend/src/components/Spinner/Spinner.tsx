import React from "react";

import "./styles.css";

type SpinnerProps = {
  variant?: "primary" | "secondary";
  size?: number;
};

export default function Spinner(props: Readonly<SpinnerProps>) {
  const { variant = "primary", size = 30 } = props;

  return (
    <div
      className={`spinner spinner--${variant}`}
      style={{ height: size, width: size }}
    ></div>
  );
}
