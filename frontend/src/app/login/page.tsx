"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import appLogo from "./../../../public/app-logo.png";
import Input from "@/components/form/Input/Input";
import Button from "@/components/Button/Button";
import { login } from "@/services/authService";

import "./styles.css";

export default function Login() {
  const { login: loginAction, user, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await login(event?.target?.email?.value, event?.target?.password?.value);
    } catch (error) {
      toast.error("Ocurrió un error al iniciar sesión, por favor intenta nuevamente");
      console.error(error);
    }
    loginAction({
      userId: 1,
    });
  };

  const handleAdminLogin = () => {
    loginAction({
      userId: 2,
      role: "admin",
    });
  };

  if (user && isAdmin) return router.push("/top-players");

  if (user) return router.push("/");

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
        <Button label="Iniciar sesión" type="submit" />
        <Button
          label="Registrarse"
          variant="secondary"
          onClick={() => router.push("/register")}
          type="button"
        />
      </form>
      <a href="/forgot-password">¿Olvidaste tu contraseña?</a>

      <Button label="User login" onClick={handleLogin} />
      <Button label="Admin login" onClick={handleAdminLogin} variant="secondary" />
    </main>
  );
}
