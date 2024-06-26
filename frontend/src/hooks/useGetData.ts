import { useCallback, useState } from "react";

export default function useGetData() {
  const [reqData, setReqData] = useState<{
    data: any;
    error: boolean;
    isLoading: boolean;
    isLoaded: boolean;
  }>({
    data: null,
    error: false,
    isLoading: false,
    isLoaded: false,
  });

  const getData = useCallback(
    async (getDataFunction: () => Promise<any>) => {
      setReqData({
        data: null,
        error: false,
        isLoading: true,
        isLoaded: false,
      });

      try {
        const data = await getDataFunction();

        setReqData({
          data,
          error: false,
          isLoading: false,
          isLoaded: true,
        });
      } catch (error) {
        setReqData({
          data: null,
          error: true,
          isLoading: false,
          isLoaded: true,
        });
      }
    },
    [setReqData]
  );

  return {
    ...reqData,
    getData,
  };
}
