import { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/axiosInstance';
import { NotificationType } from '../types/interface';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosPrivate.get('/user/notifications');
        setNotifications(response.data.notifications);
        console.log(response);
        
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  //   const markAsRead = async (notificationId: string) => {
  //     try {
  //       await axiosPrivate.post('/api/notifications/mark-read', { notificationId });
  //       setNotifications(notifications.map((notification) =>
  //         notification._id === notificationId ? { ...notification, status: 'Read' } : notification
  //       ));
  //     } catch (error) {
  //       console.error('Error marking notification as read:', error);
  //     }
  //   };

  return (
    <div>
      UserNotifications
      <div>
        <h3>Your Notifications</h3>
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <p>{notification.message}</p>
              <p>Status: {notification.status}</p>
              <button>
                Mark as Read
              </button>
              {/* <button onClick={() => markAsRead(notification._id)}>
                Mark as Read
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserNotifications;
