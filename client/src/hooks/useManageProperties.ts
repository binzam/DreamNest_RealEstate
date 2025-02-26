import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PropertyDataType, PropertyEditFormData,  } from '../types/propertyTypes';
import { axiosPrivate } from '../api/axiosInstance';

export const useFetchUserProperties = (userId?: string) => {
  return useQuery<PropertyDataType[], Error>({
    queryKey: ['properties', userId],
    queryFn: async () => {
      const endpoint = userId
        ? `/admin/users/${userId}/properties`
        : '/properties/my-properties';
      const response = await axiosPrivate.get(endpoint);
      return response.data;
    },
  });
};
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axiosPrivate.delete(`/properties/list/${id}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};
export const useUpdateProperty = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedProperty: PropertyEditFormData) =>
      axiosPrivate.put(`/properties/list/${id}/update`, updatedProperty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property', id] });
    },
  });
};
