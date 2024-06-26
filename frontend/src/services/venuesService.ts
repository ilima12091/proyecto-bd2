import { BASE_URL } from "@/constants/globalConstants";
import { Venue } from "@/types/Venue";

export async function getVenues(): Promise<Venue[]> {
  const response = await fetch(`${BASE_URL}/venues`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting venues");

  return response.json();
}

export async function updateVenue(venueId: number, venueData: Venue): Promise<void> {
  delete venueData?.id;
  const response = await fetch(`${BASE_URL}/venues/${venueId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ venueData }),
  });
  if (!response.ok) throw new Error("Error updating venue");
}

export async function deleteVenue(venueId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/venues/${venueId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting venue");
}
