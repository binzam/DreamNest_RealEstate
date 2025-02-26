import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PropertyDataType } from '../types/propertyTypes';
import { axiosPrivate } from '../api/axiosInstance';

export const useFetchWishlist = (isAuthenticated: boolean, userId?: string) => {
  return useQuery<PropertyDataType[], Error>({
    queryKey: ['wishlist', userId],
    queryFn: async () => {
      if (!isAuthenticated) return []; 
      // console.log('useFetchWishlist called');
      const endPoint = !userId
        ? '/user/wishlist'
        : `/admin/users/${userId}/wishlist`;
      const response = await axiosPrivate.get(endPoint);
      // console.log('useFetchWishlist RESPOMSE', response);
      return response.data.wishlist;
    },
    enabled: isAuthenticated,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<PropertyDataType[], Error, string>({
    mutationFn: async (propertyId) => {
      const response = await axiosPrivate.post('/user/add-to-wishlist', {
        propertyId,
      });
      return response.data.wishlist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<PropertyDataType[], Error, string>({
    mutationFn: async (propertyId) => {
      const response = await axiosPrivate.post('/user/remove-from-wishlist', {
        propertyId,
      });
      return response.data.wishlist;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
