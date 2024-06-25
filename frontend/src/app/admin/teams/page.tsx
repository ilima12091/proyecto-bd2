import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Teams() {
  return (
    <ProtectedRoute>
      <h1>Teams</h1>
    </ProtectedRoute>
  );
}
