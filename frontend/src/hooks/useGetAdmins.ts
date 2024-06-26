import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";
import { getVenues } from "@/services/venuesService";

export default function useGetAdmins() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getAdminsData = useCallback(async () => {
    await getData(async () => await getVenues());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getAdminsData();
  }, [isLoaded, isLoading, getAdminsData]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getAdminsData,
  };
}
