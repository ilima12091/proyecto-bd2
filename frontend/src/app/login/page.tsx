"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import appLogo from "./../../../public/app-logo.png";
import Image from "next/image";
import Input from "@/components/form/Input/Input";
import Button from "@/components/Button/Button";
import useRequest from "@/hooks/useRequest";
import { login } from "@/services/authService";

import "./styles.css";
import toast from "react-hot-toast";

export default function Login() {
  const { login: loginAction, user } = useAuth();
  const router = useRouter();

  const { executeRequest } = useRequest(
    async (email, password) => await login(email, password)
  );

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const result = await executeRequest(
        event?.target?.email?.value,
        event?.target?.password?.value
      );
      console.log(result);
    } catch (error) {
      toast.error("Ocurrió un error al iniciar sesión, por favor intenta nuevamente");
      console.error(error);
    }
    loginAction({
      userId: 1,
    });
    router.push("/");
  };

  const handleAdminLogin = () => {
    loginAction({
      userId: 2,
      role: "admin",
    });
    router.push("/");
  };

  if (user) router.push("/");

  return (
    <main className="page-container">
      <Image src={appLogo} alt="App logo" className="app-logo" />
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Iniciar sesión</h1>
        <Input
          type="text"
          placeholder="Correo electrónico"
          variant="outlined"
          name="email"
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          variant="outlined"
          name="password"
          required
        />
        <Button label="Iniciar sesión" />
      </form>
      <Button label="User login" onClick={handleLogin} />
      <Button label="Admin login" onClick={handleAdminLogin} variant="secondary" />
    </main>
  );
}
