"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login, user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login({
      userId: 1,
    });
    router.push("/");
  };

  if (user) router.push("/");

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
