import React from "react";
import Input from "../form/Input/Input";
import Button from "../Button/Button";

import "./styles.css";
import Select from "../form/Select/Select";

type FormGeneratorProps = {
  fields: {
    label: string;
    type: string;
    name: string;
    required?: boolean;
    value?: string;
    items?: { value: string; label: string }[];
  }[];
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  title?: string;
  disabled?: boolean;
};

export default function FormGenerator(props: Readonly<FormGeneratorProps>) {
  const {
    onSubmit,
    fields,
    title,
    onCancel,
    disabled,
    submitText = "Guardar",
    cancelText = "Cancelar",
  } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="form-generator">
      {title && <h1>{title}</h1>}
      <div className="form-generator-fields">
        {fields?.map(({ name, label, type, required, value, items }) => {
          return (
            <div key={name} className="form-generator-field">
              <label htmlFor={name}>{label}</label>
              {type === "select" ? (
                <Select
                  name={name}
                  required={required}
                  variant="outlined"
                  placeholder={label}
                  defaultValue={value ?? ""}
                  disabled={disabled}
                  items={items ?? []}
                />
              ) : (
                <Input
                  type={type}
                  name={name}
                  required={required}
                  variant="outlined"
                  placeholder={label}
                  defaultValue={value ?? ""}
                  disabled={disabled}
                />
              )}
            </div>
          );
        })}
      </div>
      <Button label={submitText} disabled={disabled} />
      {onCancel && (
        <Button label={cancelText} variant="secondary" type="button" onClick={onCancel} />
      )}
    </form>
  );
}
