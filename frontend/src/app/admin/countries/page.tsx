import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Countries() {
  return (
    <ProtectedRoute>
      <h1>Countries</h1>
    </ProtectedRoute>
  );
}
