import { BASE_URL } from "@/constants/globalConstants";
import { Country } from "@/types/Country";

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(`${BASE_URL}/countries`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting countries");

  return response.json();
}

export async function updateCountry(
  countryId: number,
  countryData: Country
): Promise<void> {
  delete countryData?.id;
  const response = await fetch(`${BASE_URL}/countries/${countryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ countryData }),
  });
  if (!response.ok) throw new Error("Error updating country");
}

export async function deleteCountry(countryId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/countries/${countryId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting country");
}
