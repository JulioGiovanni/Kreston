import useSWR from 'swr';

export const UsePregunta = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/preguntas/${id}`,
    (url) =>
      fetch(url).then(async (response: any) => {
        const data = await response.json();
        return data.data;
      }),
    {
      refreshInterval: 100,
    }
    // {
    //   revalidateIfStale: false,
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: false,
    // }
  );
  return {
    Preguntas: data,
    error,
    isLoading,
    mutate,
  };
};
