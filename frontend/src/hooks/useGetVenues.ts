import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";
import { getVenues } from "@/services/venuesService";

export default function useGetVenues() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getVenuesData = useCallback(async () => {
    await getData(async () => await getVenues());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getVenuesData();
  }, [isLoaded, isLoading, getVenuesData]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getVenuesData,
  };
}
