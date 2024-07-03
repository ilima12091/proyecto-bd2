import { BASE_URL } from "@/constants/globalConstants";
import { Prediction } from "@/types/Prediction";

export async function getPredictionsByUserId(userId: number): Promise<Prediction[]> {
  const response = await fetch(`${BASE_URL}/predictions/users/${userId}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting predictions");

  return response.json();
}

export async function createPrediction(
  userId: number,
  homeGoals: number,
  awayGoals: number,
  matchId: number
): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/predictions/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ homeGoals: +homeGoals, awayGoals: +awayGoals, matchId }),
  });

  if (!response.ok) throw new Error("Error creating prediction");

  return true;
}
