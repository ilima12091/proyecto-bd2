"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import appLogo from "./../../../public/app-logo.png";
import Link from "next/link";
import useRequest from "@/hooks/useRequest";
import { register } from "@/services/authService";
import toast from "react-hot-toast";
import FormGenerator from "@/components/FormGenerator/FormGenerator";
import { registerFormFields } from "./data/register-form-fields";

import "./styles.css";
import useGetData from "@/hooks/useGetData";
import { getTeams } from "@/services/teamsService";

export default function Register() {
  const { user } = useAuth();
  const router = useRouter();

  const { data: teams } = useGetData(async () => await getTeams());

  const { isLoading, executeRequest } = useRequest(
    async (name, surname, email, password, identificationId, champion, runnerUp) =>
      await register(name, surname, email, password, identificationId, champion, runnerUp)
  );

  if (user) router.push("/");

  const handleRegister = async (values: any) => {
    try {
      if (values?.password !== values?.passwordConfirmation)
        return toast.error("Las contraseñas no coinciden");

      await executeRequest(
        values?.name,
        values?.surname,
        values?.email,
        values?.password,
        values?.identificationId,
        values?.champion,
        values?.runnerUp
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
      <div className="register-form">
        <h1>Registrarse</h1>
        <FormGenerator
          fields={registerFormFields(
            teams ?? [
              {
                name: "Team 1",
                id: 1,
              },
            ]
          )}
          onSubmit={handleRegister}
          disabled={isLoading}
        />
      </div>
      <p>
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="link">
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}
