import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";

export default function useGetCareers() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getCareersData = useCallback(async () => {
    await getData(async () => await getCareersData());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getCareersData();
  }, [isLoaded, isLoading, getCareersData]);

  return {
    isLoading,
    isLoaded,
    error,
    data,
    getCareersData,
  };
}
