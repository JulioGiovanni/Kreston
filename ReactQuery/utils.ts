import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const performSearch = (query: string, setQuery: any) => {
  setQuery(query);
  window.setTimeout(() => {
    queryClient.invalidateQueries(['clientes', { query }]);
  }, 500);
};

export function useGenericMutation<T>(
  mutationFn: (data: T) => Promise<any>,
  key: string,
  form: any,
  options?: Parameters<typeof useMutation>[1]
) {
  const queryClient = useQueryClient();

  return useMutation((data: T) => mutationFn(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${key}`]);
    },
    onError: (error: any) => {
      form.setError(error.response.data.type, {
        type: 'custom',
        message: error.response.data.message,
      });
    },
    ...options,
  });
}
export function useGenericQuery<T>({
  key,
  queryFn,
  options,
}: {
  key: string;
  queryFn: () => Promise<T>;
  options?: any;
}) {
  return useQuery([`${key}`], () => queryFn(), {
    ...options,
  });
}
