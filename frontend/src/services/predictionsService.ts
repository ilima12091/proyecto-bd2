import { Prediction } from "@/types/Prediction";

const baseUrl = process.env.BACKEND_BASE_URL ?? process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getPredictionsByUserId(userId: number): Promise<Prediction[]> {
  const response = await fetch(`${baseUrl}/users/${userId}/predictions`, {
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
): Promise<void> {
  const response = await fetch(`${baseUrl}/users/${userId}/predictions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ homeGoals: +homeGoals, awayGoals: +awayGoals, matchId }),
  });

  if (!response.ok) throw new Error("Error creating prediction");
}
