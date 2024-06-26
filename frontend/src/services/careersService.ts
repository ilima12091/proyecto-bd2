import { BASE_URL } from "@/constants/globalConstants";
import { Career } from "@/types/Career";

export async function getCareers(): Promise<Career[]> {
  const response = await fetch(`${BASE_URL}/careers`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting careers");

  return response.json();
}

export async function updateCareer(careerId: number, careerData: Career) {
  delete careerData?.id;
  const response = await fetch(`${BASE_URL}/careers/${careerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ careerData }),
  });
  if (!response.ok) throw new Error("Error updating career");
}

export async function deleteCareer(careerId: number) {
  const response = await fetch(`${BASE_URL}/careers/${careerId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting career");
}
