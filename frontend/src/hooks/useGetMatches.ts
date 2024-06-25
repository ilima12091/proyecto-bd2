import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";
import { getMatches } from "@/services/matchesService";

export default function useGetMatches() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getMatchesData = useCallback(async () => {
    await getData(async () => await getMatches());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getMatchesData();
  }, [isLoaded, isLoading, getMatchesData]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getPredictions: getMatchesData,
  };
}
