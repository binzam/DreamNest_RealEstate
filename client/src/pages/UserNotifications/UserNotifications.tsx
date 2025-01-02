import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import { NotificationType } from '../../types/interface';
import './UserNotifications.css';
import { Link } from 'react-router-dom';
const UserNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosPrivate.get('/user/notifications');
        console.log(response);

        setNotifications(response.data.notifications);
        console.log(response);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notf_page">
      <div className="notf_hdr">
        <h2>Notifications</h2>
      </div>
      <div className="notf_contnt">
        <div>
          {notifications.length === 0 && <p>No notifications</p>}
          <ul className="notf_list">
            {notifications.map((notification) => {
              return (
                <li key={notification._id} className="notf_item">
                  <div className="notf_top">
                    <div>
                      <h3 className="notf_ttl">{notification.title}</h3>
                      <p className="notf_msg">{notification.message}</p>
                      <Link
                        to={`/tour-schedules?tourId=${notification.idOfTour}`}
                      >
                        View Tour Details
                      </Link>
                    </div>
                  </div>
                  <button className="mark_read_btn">Mark as Read</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
