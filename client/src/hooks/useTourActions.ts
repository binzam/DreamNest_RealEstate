import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../api/axiosInstance';
import { TourType } from '../types/interface';

export const useFetchTourSchedules = (userId?: string) => {
  return useQuery<TourType[], Error>({
    queryKey: ['tour-schedules', userId],
    queryFn: async () => {
      const endpoint = userId
        ? `/admin/users/${userId}/tour-schedules`
        : '/tour/schedules';
      const response = await axiosPrivate.get(endpoint);
      return response.data.tours;
    },
  });
};

const fetchTourRequests = async () => {
  const response = await axiosPrivate.get('/tour/requests');
  return {
    tours: response.data.tours,
    tourDates: response.data.tourDates.map((date: string) => new Date(date)),
  };
};

export const useFetchTourRequests = () => {
  return useQuery({
    queryKey: ['tourRequests'],
    queryFn: fetchTourRequests,
  });
};
export const useConfirmTourRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tourId: string) => {
      const response = await axiosPrivate.patch(`/tour/confirm/${tourId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tourRequests'] });
    },
  });
};

// Mutation for canceling a tour request
export const useCancelTourRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tourId: string) => {
      const response = await axiosPrivate.patch(`/tour/cancel/${tourId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tourRequests'] });
    },
  });
};
