import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Stadiums() {
  return (
    <ProtectedRoute>
      <h1>Stadiums</h1>
    </ProtectedRoute>
  );
}
