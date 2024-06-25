import { BASE_URL } from "@/constants/globalConstants";
import { Match } from "@/types/Match";

export async function getMatches(): Promise<Match[]> {
  const response = await fetch(`${BASE_URL}/matches`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting matches");

  return response.json();
}
