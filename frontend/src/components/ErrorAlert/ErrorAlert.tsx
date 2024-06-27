import React from "react";
import Image from "next/image";
import "./styles.css";
import Button from "../Button/Button";

type ErrorProps = {
  errorText: string;
  retry?: () => void;
};

export default function ErrorAlert({ errorText, retry }: Readonly<ErrorProps>) {
  return (
    <div className="error-alert">
      <Image src="/error-icon.svg" alt="Error" height={60} width={60} />
      <h3>{errorText}</h3>
      {retry && <Button label="Reintentar" onClick={retry} />}
    </div>
  );
}
