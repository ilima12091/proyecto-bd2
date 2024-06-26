import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";
import { getCountries } from "@/services/countriesService";

export default function useGetCountries() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getCountriesData = useCallback(async () => {
    await getData(async () => await getCountries());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getCountriesData();
  }, [isLoaded, isLoading, getCountriesData]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getCountriesData,
  };
}
