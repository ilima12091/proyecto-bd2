"use client";

import List from "@/components/List/List";
import PredictionItem from "./components/PredictionItem/PredictionItem";
import ErrorAlert from "@/components/ErrorAlert/ErrorAlert";
import useGetPredictions from "@/hooks/useGetPredictions";
import "./styles.css";

export default function Home() {
  const { error, data, isLoading, isLoaded, getPredictions } = useGetPredictions(1);

  return (
    <main className="predictions">
      {isLoading && <p>Cargando partidos...</p>}
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
                refetchData: getPredictions,
              }}
            />
          ) : (
            <p>No hay partidos para mostrar</p>
          )}
        </>
      )}
    </main>
  );
}
