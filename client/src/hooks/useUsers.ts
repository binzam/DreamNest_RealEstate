import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../api/axiosInstance';
import { UserProfile, UserProfileUpdate } from '../types/userTypes';
import { useUser } from '../context/useUser';
import { AxiosError } from 'axios';

export const useFetchUserProfile = (userId?: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const endpoint = userId ? `/admin/users/${userId}` : '/user/profile';
      const response = await axiosPrivate.get(endpoint);
      return response.data;
    },
  });
};

export const useUpdateUserProfile = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: UserProfileUpdate) => {
      const response = await axiosPrivate.put('/user/profile', updatedData);
      const savedUserData = JSON.parse(localStorage.getItem('DNuser') || '{}');
      console.log(response);
      const updatedUserData = {
        ...savedUserData,
        firstName: response.data.firstName,
        email: response.data.email,
      };

      localStorage.setItem('DNuser', JSON.stringify(updatedUserData));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
    },
    onError: (error: Error) => {
      console.error('Error updating profile:', error.message);
    },
  });
};
export const useUploadProfilePicture = (
  userId?: string,
  setError?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const queryClient = useQueryClient();
  const { dispatch } = useUser();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('profilePicture', file);
      const response = await axiosPrivate.post(
        '/user/profile/upload-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const savedUserData = JSON.parse(
          localStorage.getItem('DNuser') || '{}'
        );

        const updatedUserData = {
          ...savedUserData,
          profilePicture: response.data.profilePicture,
        };

        localStorage.setItem('DNuser', JSON.stringify(updatedUserData));
        dispatch({
          type: 'UPDATE_PROFILE_PICTURE',
          payload: response.data.profilePicture,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
    },
    onError: (error: AxiosError) => {
      if (setError) {
        const errorMessage =
          (error.response?.data as { message: string })?.message || 'An unexpected error occurred.';
        setError(errorMessage);
      }
      console.error('Error uploading profile picture:', error);
    },
  });
};
interface FetchUsersParams {
  searchQuery: string;
  filterRole: string;
  sortOrder: 'newest' | 'oldest';
  hasListedProperty: boolean;
}
const fetchUsers = async ({
  searchQuery,
  filterRole,
  sortOrder,
  hasListedProperty,
}: FetchUsersParams) => {
  const response = await axiosPrivate.get('/admin/users', {
    params: {
      search: searchQuery,
      role: filterRole,
      sort: sortOrder,
      hasListedProperty,
    },
  });
  return response.data;
};

export const useUsers = (params: FetchUsersParams) => {
  return useQuery<UserProfile[], Error>({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    enabled: !!params,
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axiosPrivate.delete(`/admin/users/${id}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
