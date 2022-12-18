import useSWR from 'swr';
import { getAllAreas } from '../services/area.service';

export const useAllAreas = () => {
  const { data, error, isLoading } = useSWR('/api/areas', getAllAreas);
  return {
    Areas: data,
    error,
    isLoading,
  };
};
