import { useEffect, useState } from "react";

type ApiResponse<T> = {
  data: T;
};

type ApiFunction<T> = () => Promise<ApiResponse<T>>;

type UseApiResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

const useApi = <T>(
  apiFunction: ApiFunction<T>,
  initialData: T | null = null
): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFunction();
        setData(response.data);
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useApi;
