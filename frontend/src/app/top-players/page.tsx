"use client";

import React from "react";
import ErrorAlert from "@/components/ErrorAlert/ErrorAlert";
import List from "@/components/List/List";
import PlayerItem from "./components/PlayerItem";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { getUsers } from "@/services/usersService";
import useGetData from "@/hooks/useGetData";
import Spinner from "@/components/Spinner/Spinner";

import "./styles.css";

export default function TopPlayers() {
  const { isLoading, isLoaded, data, error } = useGetData(async () => await getUsers());

  return (
    <ProtectedRoute>
      <main className="page-container">
        {isLoading && <Spinner />}
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
