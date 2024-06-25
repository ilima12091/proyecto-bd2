import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Venues() {
  return (
    <ProtectedRoute>
      <h1>Venues</h1>
    </ProtectedRoute>
  );
}
