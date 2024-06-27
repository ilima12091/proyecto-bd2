import { BASE_URL } from "@/constants/globalConstants";
import { Stadium } from "@/types/Stadium";

export async function getStadiums(): Promise<Stadium[]> {
  const response = await fetch(`${BASE_URL}/stadiums`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting stadiums");

  return response.json();
}

export async function updateStadium(
  stadiumId: number,
  stadiumData: Stadium
): Promise<void> {
  delete stadiumData?.id;
  const response = await fetch(`${BASE_URL}/stadiums/${stadiumId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stadiumData }),
  });
  if (!response.ok) throw new Error("Error updating stadium");
}

export async function deleteStadium(stadiumId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/stadiums/${stadiumId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting stadium");
}

export async function createStadium(stadiumData: Stadium): Promise<void> {
  delete stadiumData?.id;
  const response = await fetch(`${BASE_URL}/stadiums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stadiumData }),
  });
  if (!response.ok) throw new Error("Error creating stadium");
}
