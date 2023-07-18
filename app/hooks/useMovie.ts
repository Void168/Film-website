import useSWR from "swr";
import fetcher from "@/app/libs/fetcher";

const useMovie = (params?: string) => {
  const { data, error, isLoading } = useSWR(
    params ? `/api/movies/${params}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
