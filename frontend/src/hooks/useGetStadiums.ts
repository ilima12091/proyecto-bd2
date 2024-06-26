import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";
import { getMatches } from "@/services/matchesService";

export default function useGetStadiums() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getStadiumsData = useCallback(async () => {
    await getData(async () => await getMatches());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getStadiumsData();
  }, [isLoaded, isLoading, getStadiumsData]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getStadiumsData,
  };
}
