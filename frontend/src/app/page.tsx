"use client";

import List from "@/components/List/List";
import PredictionItem from "./components/PredictionItem/PredictionItem";
import ErrorAlert from "@/components/ErrorAlert/ErrorAlert";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import useGetData from "@/hooks/useGetData";
import { getPredictionsByUserId } from "@/services/predictionsService";
import Spinner from "@/components/Spinner/Spinner";

import "./styles.css";

export default function Home() {
  const { error, data, isLoading, isLoaded, refetchData } = useGetData(
    async () => await getPredictionsByUserId(1)
  );

  return (
    <ProtectedRoute>
      <main className="page-container">
        {isLoading && <Spinner />}
        {error && <ErrorAlert errorText="Error cargando partidos" />}
        {isLoaded && !error && (
          <>
            <h1 className="predictions-title">Partidos</h1>
            {data?.length > 0 ? (
              <List
                data={data}
                ItemComponent={PredictionItem}
                className="predictions-list"
                itemProps={{
                  refetchData,
                }}
              />
            ) : (
              <p>No hay partidos para mostrar</p>
            )}
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
