import { Prediction } from "@/types/Prediction";

export async function getPredictionsByUserId(userId: number): Promise<Prediction[]> {
  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/users/${userId}/predictions`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) throw new Error("Error getting predictions");

  return response.json();
}
