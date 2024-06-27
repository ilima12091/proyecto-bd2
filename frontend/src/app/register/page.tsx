"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import appLogo from "./../../../public/app-logo.png";

import "./styles.css";
import Input from "@/components/form/Input/Input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import useRequest from "@/hooks/useRequest";
import { register } from "@/services/authService";
import toast from "react-hot-toast";

export default function Register() {
  const { user } = useAuth();
  const router = useRouter();

  const { isLoading, executeRequest } = useRequest(
    async (name, surname, email, password, identificationId) =>
      await register(name, surname, email, password, identificationId)
  );

  if (user) router.push("/");

  const handleRegister = async (event: any) => {
    event.preventDefault();
    try {
      if (event?.target?.password?.value !== event?.target?.passwordConfirmation?.value)
        return toast.error("Las contraseñas no coinciden");

      await executeRequest(
        event?.target?.name?.value,
        event?.target?.surname?.value,
        event?.target?.email?.value,
        event?.target?.password?.value,
        event?.target?.identificationId?.value
      );
      toast.success("Te has registrado exitosamente");
      router.push("/login");
    } catch (error) {
      toast.error("Ocurrió un error al registrarse, por favor intenta nuevamente");
    }
  };

  return (
    <main className="page-container">
      <Image src={appLogo} alt="App logo" className="app-logo" />
      <form className="register-form" onSubmit={handleRegister}>
        <h1>Registrarse</h1>
        <Input variant="outlined" type="text" placeholder="Nombre" name="name" required />
        <Input
          variant="outlined"
          type="text"
          placeholder="Apellido"
          name="surname"
          required
        />
        <Input
          variant="outlined"
          type="text"
          placeholder="Correo electrónico"
          name="email"
          required
        />
        <Input
          variant="outlined"
          type="password"
          placeholder="Contraseña"
          name="password"
          required
        />
        <Input
          variant="outlined"
          type="password"
          placeholder="Confirmar contraseña"
          name="passwordConfirmation"
          required
        />
        <Input
          variant="outlined"
          type="text"
          placeholder="Número de identificación"
          name="identificationId"
          required
        />
        <Input
          variant="outlined"
          type="text"
          placeholder="Campeón"
          name="champion"
          required
        />
        <Input
          variant="outlined"
          type="text"
          placeholder="Subcampeón"
          name="runnerUp"
          required
        />
        <Button type="submit" label="Registrarse" disabled={isLoading} />
      </form>
      <p>
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="link">
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}
