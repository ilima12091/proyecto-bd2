import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";
import { getMatches } from "@/services/matchesService";

export default function useGetTeams() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getTeamsData = useCallback(async () => {
    await getData(async () => await getMatches());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getTeamsData();
  }, [isLoaded, isLoading, getTeamsData]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getTeamsData,
  };
}
