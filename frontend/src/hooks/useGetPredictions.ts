import { useCallback, useEffect } from "react";
import { getPredictionsByUserId } from "@/services/predictionsService";
import useGetData from "./useGetData";

export default function useGetPredictions(userId: number) {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getPredictions = useCallback(async () => {
    await getData(async () => await getPredictionsByUserId(userId));
  }, [userId, getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getPredictions();
  }, [isLoaded, isLoading, getPredictions]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getPredictions,
  };
}
