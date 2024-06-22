"use client";
import ErrorAlert from "@/components/ErrorAlert/ErrorAlert";
import List from "@/components/List/List";
import useGetTopPlayers from "@/hooks/useGetTopPlayers";
import React from "react";
import PlayerItem from "./components/PlayerItem";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

import "./styles.css";

export default function TopPlayers() {
  const { isLoading, isLoaded, error, data } = useGetTopPlayers();

  return (
    <ProtectedRoute>
      <main className="page-container">
        {isLoading && <p>Cargando top de jugadores</p>}
        {error && <ErrorAlert errorText="Error cargando top de jugadores" />}
        {isLoaded && !error && (
          <>
            <h1 className="top-players-title">Top jugadores</h1>
            {data?.length > 0 ? (
              <List data={data} ItemComponent={PlayerItem} className="players-list" />
            ) : (
              <p>No hay jugadores para mostrar</p>
            )}
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
