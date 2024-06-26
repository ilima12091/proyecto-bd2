import React from "react";
import Image from "next/image";
import "./styles.css";

type ErrorProps = {
  errorText: string;
};

export default function ErrorAlert({ errorText }: Readonly<ErrorProps>) {
  return (
    <div className="error-alert">
      <Image src="/error-icon.svg" alt="Error" height={60} width={60} />
      <h3>{errorText}</h3>
    </div>
  );
}
