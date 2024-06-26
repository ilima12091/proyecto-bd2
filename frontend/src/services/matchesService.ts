import { BASE_URL } from "@/constants/globalConstants";
import { Match } from "@/types/Match";

export async function getMatches(): Promise<Match[]> {
  const response = await fetch(`${BASE_URL}/matches`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting matches");

  return response.json();
}

export async function updateMatch(matchId: number, matchData: Match): Promise<void> {
  delete matchData?.id;
  const response = await fetch(`${BASE_URL}/matches/${matchId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matchData }),
  });
  if (!response.ok) throw new Error("Error updating match");
}

export async function deleteMatch(matchId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/matches/${matchId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting match");
}
