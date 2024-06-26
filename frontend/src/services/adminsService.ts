import { BASE_URL } from "@/constants/globalConstants";
import { Admin } from "@/types/Admin";

export async function getAdmins(): Promise<Admin[]> {
  const response = await fetch(`${BASE_URL}/admins`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Error getting admins");

  return response.json();
}

export async function updateAdmin(adminId: number, adminData: Admin) {
  delete adminData?.id;
  const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminData }),
  });
  if (!response.ok) throw new Error("Error updating admin");
}

export async function deleteAdmin(adminId: number) {
  const response = await fetch(`${BASE_URL}/admins/${adminId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting admin");
}
