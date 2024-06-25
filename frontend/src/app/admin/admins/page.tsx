import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Admins() {
  return (
    <ProtectedRoute>
      <h1>Admins</h1>
    </ProtectedRoute>
  );
}
