import { useState } from "react";

export default function useRequest(requestFunction: (...params: any[]) => Promise<any>) {
  const [requestData, setRequestData] = useState({
    data: null,
    error: false,
    isLoading: false,
  });

  const executeRequest = async (...params: any) => {
    setRequestData({ data: null, error: false, isLoading: true });

    try {
      const response = await requestFunction(params);
      setRequestData({ data: response, error: false, isLoading: false });
      return response;
    } catch (error) {
      setRequestData({ data: null, error: true, isLoading: false });
      throw error;
    }
  };

  return { executeRequest, ...requestData };
}
