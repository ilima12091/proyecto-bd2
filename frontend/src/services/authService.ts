import { BASE_URL } from "@/constants/globalConstants";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Error logging in");

  return response.json();
};

export const register = async (
  name: string,
  surname: string,
  email: string,
  password: string,
  identificationId: string,
  champion: string,
  runnerUp: string
) => {
  const response = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      surname,
      email,
      password,
      identificationId,
      champion,
      runnerUp,
    }),
  });

  if (!response.ok) throw new Error("Error registering");

  return response.json();
};
