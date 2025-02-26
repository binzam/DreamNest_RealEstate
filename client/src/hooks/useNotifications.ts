import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../api/axiosInstance';
import { NotificationType } from '../types/interface';

export const useFetchNotification = (isAuthenticated: boolean) => {
  return useQuery<NotificationType[], Error>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/user/notifications');
      // console.log('Notification API CALL: FETCH', response);
      return response.data.notifications;
    },
    enabled: isAuthenticated, 
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await axiosPrivate.patch(
        `/user/notifications/${notificationId}/read`
      );
      // console.log('Notification API CALL: MARK AS READ', response);
      return response.data.notification;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Failed to mark notification as read:', error);
    },
  });
};
