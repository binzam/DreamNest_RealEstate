import { useEffect } from 'react';
import { socket } from '../socket';
import { useQueryClient } from '@tanstack/react-query';
import { NotificationType } from '../types/interface';
import { useUser } from '../context/useUser';

const NotificationListener = () => {
  const queryClient = useQueryClient();
  const { state } = useUser();
  const { user } = state;
  useEffect(() => {
    if (user?._id) {
      socket.emit('join', user._id);
    }
    socket.on('notification', (newNotification: NotificationType) => {
      console.log('Notification received:', newNotification);

      queryClient.setQueryData<NotificationType[]>(
        ['notifications'],
        (oldNotifications = []) => [newNotification, ...oldNotifications]
      );
    });

    return () => {
      socket.off('notification');
    };
  }, [queryClient, user?._id]);

  return null;
};

export default NotificationListener;
