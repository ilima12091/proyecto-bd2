import { useCallback, useEffect } from "react";
import useGetData from "./useGetData";
import { getUsers } from "@/services/usersService";

export default function useGetTopPlayers() {
  const { isLoading, isLoaded, error, data, getData } = useGetData();

  const getUsersList = useCallback(async () => {
    await getData(async () => await getUsers());
  }, [getData]);

  useEffect(() => {
    if (!isLoaded && !isLoading) getUsersList();
  }, [isLoaded, isLoading, getUsersList]);

  return {
    isLoading,
    isLoaded,
    error: false,
    data: data ?? [
      {
        name: "Test",
        totalPoints: 400,
      },
      {
        name: "Test 2",
        totalPoints: 300,
      },
      {
        name: "Test 3",
        totalPoints: 200,
      },
      {
        name: "Test 4",
        totalPoints: 100,
      },
    ],
    getUsersList,
  };
}
