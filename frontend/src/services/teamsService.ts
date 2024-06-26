import { BASE_URL } from "@/constants/globalConstants";
import { Team } from "@/types/Team";

export async function getTeams(): Promise<Team[]> {
  const response = await fetch(`${BASE_URL}/teams`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting teams");

  return response.json();
}

export async function updateTeam(teamId: number, teamData: Team): Promise<void> {
  delete teamData?.id;
  const response = await fetch(`${BASE_URL}/teams/${teamId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teamData }),
  });
  if (!response.ok) throw new Error("Error updating team");
}

export async function deleteTeam(teamId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/teams/${teamId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting team");
}
