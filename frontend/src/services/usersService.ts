import { BASE_URL } from "@/constants/globalConstants";

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/leaderboard`);

  if (!response.ok) throw new Error("Error getting users");

  return await response.json();
}
